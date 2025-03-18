import typer
import time
import requests
from yaspin import yaspin
import json
from serial.tools import list_ports

from typing_extensions import Annotated
from typing_extensions import List
from controller.dobotController import DobotController
from controller.position import Position

cli = typer.Typer()

dobot = DobotController()
rota_qrcode = "http://127.0.0.1:5000/qrcode-response"
file_path = "config.json"

with open(file_path, "r") as file:
    data = json.load(file)

deliver_value = 1
add_height = 0
home_position = Position(x=0, y=0, z=0, r=0)

def wait_before_suction(delay_time: float = 2.5):

    print(f"Aguardando {delay_time} segundos para bipagem do medicamento...")
    time.sleep(delay_time)

def request_bip(timeout: int = 10):
    print("\U0001F551 Solicitando bipagem via HTTP...")
    try:
        response = requests.get(rota_qrcode, timeout=timeout)
        response.raise_for_status()
        scanned_medicine = response.json()
        print(f"\U0001F4E1 Medicamento bipado recebido: {scanned_medicine}")
        return scanned_medicine
    except requests.exceptions.RequestException as e:
        print(f"⏳ Falha ao obter bipagem: {e}")
        return None

def execute_movement(position, add_height=0):
    spinner = yaspin(text=f"Movendo para {position}...")
    if isinstance(position, dict):
        position = Position(**position)


    current_position = Position(x=position.x, y=position.y, z=position.z + add_height, r=position.r)
    dobot.move_l_to(current_position, wait=True)
    spinner.stop()

def validate_and_suction(position):
    if isinstance(position, dict):  
        position = Position(**position)
        
    wait_before_suction()

    
    expected_medicine = {'qrcode': '{"qr_code": "{\\"medicamento\\": \\"Paracetamol 500mg\\", \\"validade\\": \\"2026-08-15\\", \\"lote\\": \\"ABC12345\\"}"}'}
    scanned_medicine = request_bip()

    if scanned_medicine == expected_medicine:
        dobot.enable_tool(100)
        print("✅ Medicamento validado. Descendo para coletar...")

        current_position = Position(x=position.x, y=position.y - 20, z=position.z - 145, r=position.r)
        
        dobot.move_l_to(current_position, wait=True)
        
        time.sleep(1.0)
        current_position.z += 30
        dobot.move_l_to(current_position, wait=True)
        
        return True
    else:
        print("⚠️ Medicamento inválido! Retornando ao home.")
        return_to_home()
        return False

def take_medicine(bin: str):
    for position in data[bin]:
        execute_movement(position)  # Faz o XY primeiro
        if isinstance(position, dict):  
            position = Position(**position)
        success = validate_and_suction(position)  # Faz a validação e desce se válido
        if success:
            deliver()
            return  # Sai do loop após entrega
        else:
            return  # Sai sem entregar se inválido


def return_to_home():
    print("\U0001F3E0 Retornando à posição padrão...")
    dobot.move_l_to(home_position, wait=True)
    print("✅ Robô na posição padrão.")

def deliver():
    global deliver_value, add_height
    if deliver_value > 6:
        deliver_value = 1
        add_height += 20

    for index, position in enumerate(data[f"delivery_{deliver_value}"]):
        execute_movement(position, add_height if index == 1 else 0)
    deliver_value += 1


@cli.command()
def collect_bin(
    bin_1: Annotated[int, typer.Argument(help="Quantidade do bin 1")] = 0,
    bin_2: Annotated[int, typer.Argument(help="Quantidade do bin 2")] = 0,
    bin_3: Annotated[int, typer.Argument(help="Quantidade do bin 3")] = 0,
    bin_4: Annotated[int, typer.Argument(help="Quantidade do bin 4")] = 0,
    bin_5: Annotated[int, typer.Argument(help="Quantidade do bin 5")] = 0,
):
    bin_counts = {1: bin_1, 2: bin_2, 3: bin_3, 4: bin_4, 5: bin_5}
    for bin_num in range(1, 6):
        for i in range(bin_counts[bin_num]):
            take_medicine(f"bin_{bin_num}")

@cli.command()
def collect_list(input_list: Annotated[List[str], typer.Argument(help="Lista dos bins a coletar")]):
    ordered_list = sorted(input_list)
    for bin_num in ordered_list:
        take_medicine(f'bin_{bin_num}')

def main():
    available_ports = list_ports.comports()
    print(f'available ports: {[x.device for x in available_ports]} \n')
    port_input = input("Desired port number: ")
    port = available_ports[int(port_input)].device
    spinner = yaspin(text=f"Connecting with port {port}...")
    spinner.start()
    dobot.connect(port)
    dobot.set_speed(150, 150)
    # dobot.home()
    spinner.stop()
    cli()

if __name__ == '__main__':
    main()
