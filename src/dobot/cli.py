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

with open(file_path, "r") as file:
        data = json.load(file)

deliver_value = 1
add_height = 0

def check_suction(
    position: Annotated[Position, typer.Argument(help="Position data to check if suction should be enabled or disabled.")]
):
    if (position.get("suction")):
        dobot.enable_tool(100)
    else:
        dobot.disable_tool(100)
    
def execute_movement(
    position: Annotated[Position, typer.Argument(help="Position data to determine and execute the appropriate movement.")],
    add_height: Annotated[int, typer.Argument(help="Additional height to be added to Z if it is the last position of the delivery.")] = 0
):
    spinner = yaspin(text=f"Moving to {position}...")
    current_position = Position()
    current_position.load_from_dict(position)

    current_position.z += add_height;
    
    if position.get("move") == "move_l":
        dobot.move_l_to(current_position, wait=True)
    else:
        dobot.move_j_to(current_position, wait=True)
        
    spinner.stop()

def deliver(
    unique: Annotated[bool, typer.Argument(help="is a unique deliver?")] = False
):
    global deliver_value
    global add_height
    
    if deliver_value == 7:
        deliver_value = 1;
        add_height += 20;
            
    for index, position in enumerate(data[f"delivery_{deliver_value}"]):
        check_suction(position)
        
        if index != 1:
            execute_movement(position)
        else:
            execute_movement(position, add_height)
    deliver_value += 1;

def take_medicine(
    bin: Annotated[str, typer.Argument(help="Name of the bin from which medicine should be taken.")]
):
    for position in data[bin]:
        check_suction(position)
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