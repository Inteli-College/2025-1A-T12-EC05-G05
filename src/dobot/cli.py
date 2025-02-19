import typer
from yaspin import yaspin
import json
from serial.tools import list_ports

from typing_extensions import Annotated
from controller.dobotController import DobotController
from controller.position import Position

cli = typer.Typer()

dobot = DobotController()

@cli.command()
def collect_bin(

):
    print(":)")

@cli.command()
def collect_list(

):
    print("(:")

def main():
    available_ports = list_ports.comports()
    print(f'available ports: {[x.device for x in available_ports]} \n')
    port_input = input("Desired port number: ")
    port = available_ports[int(port_input)].device
    spinner = yaspin(text=f"Connecting with port {port}...")
    spinner.start()
    dobot.connect(port)
    spinner.stop()
    cli()

if __name__ == '__main__':
    main()