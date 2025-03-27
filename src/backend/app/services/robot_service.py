import subprocess
import os

class RobotService:

    @staticmethod
    def move_to_position(position, add_height):
        try:
            # Caminho absoluto para o script CLI
            cli_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'dobot', 'cli.py')
            cli_path = os.path.normpath(cli_path)
            
            # Gera o comando para mover o robô
            command = f"python {cli_path} move --position {position} --add_height {add_height}"
            subprocess.run(command, shell=True, check=True)
            print(f"Movendo para {position} com altura adicional de {add_height}")
        except subprocess.CalledProcessError as e:
            print(f"Erro ao mover o robô: {e}")
            raise Exception("Erro ao mover o robô")
    
    @staticmethod
    def collect_medicine(bin_list):
        try:
            # Caminho absoluto para o script CLI
            cli_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'dobot', 'cli.py')
            cli_path = os.path.normpath(cli_path)
            
            # Gera o comando para coletar os medicamentos
            command = f"python {cli_path} collect_list {' '.join(bin_list)}"
            subprocess.run(command, shell=True, check=True)
            print(f"Coletando os medicamentos dos bins: {', '.join(bin_list)}")
        except subprocess.CalledProcessError as e:
            print(f"Erro ao coletar medicamento: {e}")
            raise Exception("Erro ao coletar medicamento")
