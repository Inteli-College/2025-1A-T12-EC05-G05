import typer
from yaspin import yaspin
import json
from serial.tools import list_ports

from typing_extensions import Annotated
from typing_extensions import List
from controller.dobotController import DobotController
from controller.position import Position

cli = typer.Typer()

dobot = DobotController()
    
file_path = "config.json"

def check_suction(
    position: Annotated[Position, typer.Argument(help="Position data to check if suction should be enabled or disabled.")]
):
    if (position.get("suction")):
        dobot.enable_tool(100)
    else:
        dobot.disable_tool(100)
    
def execute_movement(
    position: Annotated[Position, typer.Argument(help="Position data to determine and execute the appropriate movement.")]
    
):
    spinner = yaspin(text=f"Moving to {position}...")
    current_position = Position()
    current_position.load_from_dict(position)

    if position.get("move") == "move_l":
        dobot.move_l_to(current_position, wait=True)
    else:
        dobot.move_j_to(current_position, wait=True)
        
    spinner.stop()

def take_medicine(
    bin: Annotated[str, typer.Argument(help="Name of the bin from which medicine should be taken.")]
):
    with open(file_path, "r") as file:
        data = json.load(file)
    for position in data[bin]:
        check_suction(position)
        execute_movement(position)
    for position in data["delivery"]:
        check_suction(position)
        execute_movement(position)

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
def collect_list(
    input_list: Annotated[List[str], typer.Argument(help="List of bins to collect")],
):
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
    spinner.stop()
    cli()

if __name__ == '__main__':
    main()