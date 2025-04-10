import subprocess
from .dobot.cli import collect_list

class RobotService:

    @staticmethod
    def move_to_position(position, add_height):
        try:
            print(f"Movendo para {position} com altura adicional de {add_height}")
        except subprocess.CalledProcessError as e:
            print(f"Erro ao mover o robô: {e}")
            raise Exception("Erro ao mover o robô")
    
    @staticmethod
    def collect_medicine(bin_list, fita):
        try:
            collect_list(bin_list, fita)
            print(f"Coletando os medicamentos dos bins: {', '.join(bin_list)}")
        except subprocess.CalledProcessError as e:
            print(f"Erro ao coletar medicamento: {e}")
            raise Exception("Erro ao coletar medicamento")
