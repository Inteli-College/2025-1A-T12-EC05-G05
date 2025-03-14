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
SERVER = "http://localhost:5000/medicamento"
file_path = "config.json"

with open(file_path, "r") as file:
    data = json.load(file)

deliver_value = 1
add_height = 0
home_position = Position(x=0, y=0, z=0, r=0)  # Define a posição inicial padrão

def wait_before_suction(delay_time: float = 2.5):
    """ Aguarda um tempo antes da sucção para permitir a leitura do QR Code. """
    print(f"Aguardando {delay_time} segundos para bipagem do medicamento...")
    time.sleep(delay_time)
    
def request_bip(timeout: int = 10):
    """Faz a requisição para bipar um medicamento via HTTP."""
    print("🕐 Solicitando bipagem via HTTP...")

    try:
        response = requests.get(SERVER, timeout=timeout)
        response.raise_for_status()
        scanned_medicine = response.json()
        print(f"📡 Medicamento bipado recebido: {scanned_medicine}")
        return scanned_medicine

    except requests.exceptions.RequestException as e:
        print(f"⏳ Falha ao obter bipagem: {e}")
        return None
      
def check_suction(position: Position, is_bin: bool = False):
    """ 
    Realiza a sucção e verifica se o medicamento deve ser aceito, descartado ou retornado.
    O delay só acontece se estiver pegando um medicamento do bin.
    """
    
    if is_bin:
        wait_before_suction()  # Só espera a leitura do QR Code ao pegar no bin
    
    # Simulação de validação do medicamento
    expected_medicine = {
      "medicamento": "Paracetamol 500mg", 
      "validade": "2026-08-15", 
      "lote":"ABC12345"
    }
    
    # scanned_medicine = request_bip()
    
    scanned_medicine = {
      "medicamento": "Paracetamol 500mg", 
      "validade": "2026-08-15", 
      "lote":"ABC12345"
    }
    
    if scanned_medicine == expected_medicine:
      if (position.get("suction")):
        dobot.enable_tool(100) 
        print("✅ Medicamento validado. Procedendo para a fita de medicamentos.")
      else:
        dobot.disable_tool(100)
      
    else:
        print("⚠️ Medicamento inválido. Decidindo ação...")
        if scanned_medicine["expiration_date"] < "2024-12-31":  # Simulação de medicamento vencido
            discard_medicine()
        else:
            return_medicine()

def execute_movement(position, add_height=0):
    """ Move o robô para a posição especificada, aplicando delay apenas antes de descer para pegar o medicamento. """
    spinner = yaspin(text=f"Movendo para {position}...")

    # 🔥 Converte dicionário para objeto Position, se necessário
    if isinstance(position, dict):  
        position = Position(**position)

    # 🔹 Move para X, Y primeiro (sem delay)
    current_position = Position(x=position.x, y=position.y, z=position.z, r=position.r)
    dobot.move_l_to(current_position, wait=True)

    # 🔹 Aplicar delay antes de descer para Z (pegando medicamento)
    if "bin" in position.move:  # Certifica-se de que é um movimento para um bin
        print(f"⏳ Aguardando 2.5 segundos antes de descer para coletar o medicamento no bin {position.move}...")
        time.sleep(2.5)

    # 🔹 Agora move Z (descendo para pegar o medicamento)
    current_position.z += add_height
    dobot.move_l_to(current_position, wait=True)

    spinner.stop()



def deliver():
    """Entrega o medicamento coletado na posição correta e só retorna ao home no final de todas as entregas."""
    global deliver_value, add_height

    if deliver_value > 6:
        deliver_value = 1
        add_height += 20

    for index, position in enumerate(data[f"delivery_{deliver_value}"]):
        check_suction(position, is_bin=False)
        execute_movement(position, add_height if index == 1 else 0)

    deliver_value += 1

    

def return_medicine():
    """ Retorna o medicamento ao bin original caso seja válido, mas incorreto. """
    print("🔄 Retornando medicamento ao bin original...")
    bin_position = Position(x=100, y=200, z=50, r=0)  # Posição simulada do bin original
    execute_movement(bin_position)
    dobot.disable_tool(100)  # Solta o medicamento
    print("✅ Medicamento devolvido ao bin.")


def discard_medicine():
    """ Descarta o medicamento caso esteja vencido. """
    print("⚠️ Descartando medicamento vencido...")
    discard_position = Position(x=200, y=100, z=50, r=0)  # Posição simulada de descarte
    execute_movement(discard_position)
    dobot.disable_tool(100)  # Solta o medicamento
    print("✅ Medicamento descartado com sucesso!")


def take_medicine(bin: str):
    """ Coleta um medicamento do bin e entrega-o na fita. """
    for position in data[bin]:
        check_suction(position, is_bin=True)  # Delay só quando pega no bin
        execute_movement(position)
    deliver()

@cli.command()
def collect_bin(
    bin_1: Annotated[int, typer.Argument(help="Quantity of medicine to collect from bin 1")] = 0,
    bin_2: Annotated[int, typer.Argument(help="Quantity of medicine to collect from bin 2")] = 0,
    bin_3: Annotated[int, typer.Argument(help="Quantity of medicine to collect from bin 3")] = 0,
    bin_4: Annotated[int, typer.Argument(help="Quantity of medicine to collect from bin 4")] = 0,
    bin_5: Annotated[int, typer.Argument(help="Quantity of medicine to collect from bin 5")] = 0,
):
    bin_counts = {
        1: bin_1,
        2: bin_2,
        3: bin_3,
        4: bin_4,
        5: bin_5,
    }
    
    for bin_num in range(1, 6):
        for i in range(bin_counts[bin_num]):
            take_medicine(f"bin_{bin_num}")

@cli.command()
def collect_list(input_list: Annotated[List[str], typer.Argument(help="List of bins to collect")]):
    """ Coleta medicamentos de uma lista específica de bins. """
    ordered_list = sorted(input_list)
    for bin_num in ordered_list:
        take_medicine(f'bin_{bin_num}')

def main():
    """ Inicializa a conexão com o robô e aguarda comandos. """
    available_ports = list_ports.comports()
    print(f'available ports: {[x.device for x in available_ports]} \n')
    port_input = input("Desired port number: ")
    port = available_ports[int(port_input)].device
    spinner = yaspin(text=f"Connecting with port {port}...")
    spinner.start()
    dobot.connect(port)
    dobot.set_speed(150, 150)
    spinner.stop()
    cli()

if __name__ == '__main__':
    main()
