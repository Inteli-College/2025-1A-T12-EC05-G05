import os
import sqlite3
from termcolor import colored
from getpass import getpass

import typer
import time
import requests
from yaspin import yaspin
import json
from serial.tools import list_ports

from typing_extensions import Annotated
from typing_extensions import List
from .controller.dobotController import DobotController
from .controller.position import Position

file_path = os.path.join(os.path.dirname(__file__), "config.json")
file_path_med = os.path.join(os.path.dirname(__file__), "medicamentos.json")
cli = typer.Typer()

dobot = DobotController()


with open(file_path, "r") as file:
    data = json.load(file)

with open(file_path_med, "r") as file:
    data_med = json.load(file)

deliver_value = 1
add_height = 0

def enviar_log(responsavel: str, descricao: str, status: str):
    url = "http://localhost:5000/api/logs"
    payload = {
        "responsavel": responsavel,
        "descricao": descricao,
        "status": status
    }
    
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")
        
def identidade_visual():
    print(colored("""
  _____                         _       _   
 |  __ \                       (_)     | |  
 | |__) | __ ___  ___  ___ _ __ _ _ __ | |_ 
 |  ___/ '__/ _ \/ __|/ __| '__| | '_ \| __|
 | |   | | |  __/\__ \ (__| |  | | |_) | |_ 
 |_|   |_|  \___||___/\___|_|  |_| .__/ \__|
                                 | |        
                                 |_|        
    """, "cyan"))

def conectar_ao_banco():
    print(f"⚙ Conectando ao banco de dados...")
    time.sleep(1)
    
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        db_path = os.path.join(current_dir, "instance", "dbCli.sqlite")
        db_path = os.path.normpath(db_path)
        
        if not os.path.exists(db_path):
            return None  # Retorna None se o banco de dados não existir
            
        conn = sqlite3.connect(db_path)
        conn.text_factory = str
        print("Conectado!") 
        return conn
    except Exception as e:
        print(f" ⚠️ Erro ao conectar ao banco de dados: {e} ⚠️")
        return None

def query_login(conn, nome, senha):
    if conn is None:
        return False
    try:
        cursor = conn.cursor()
        query = "SELECT senha FROM user WHERE nome = ?"
        cursor.execute(query, (nome,))
        resultado = cursor.fetchone()

        if resultado:
            senha_correta = resultado[0]
            # Compara a senha fornecida com a senha armazenada
            return senha == senha_correta  # Retorna True se as senhas coincidirem
        else:
            return False  # Usuário não encontrado
    except Exception as e:
        print(f" ⚠️ Erro na consulta ao banco durante login: {e} ⚠️")
        return False
    finally:
        if cursor:
            cursor.close()

def buscar_logs_usuario(conn, nome):
    if conn is None:
        return []
    
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT id, qrcode, presenca FROM log WHERE user_nome = ?", (nome,))
        logs = cursor.fetchall()
        return logs
    except Exception as e:
        print(f" ⚠️ Erro ao consultar logs do usuário: {e} ⚠️")
        return []
    finally:
        if cursor:
            cursor.close()

def login(conn):
    time.sleep(1)
    print("\n👤 LOGIN")
    nome = input("    ➣  Digite seu nome: ")
    senha = getpass("    ➣  Digite sua senha: ")
    
    autenticado = query_login(conn, nome, senha)
    
    if autenticado:  # Se autenticado for True
        time.sleep(1)
        print(f"\nBem-vindo(a), {nome}")
        menu_inicial(conn, nome)
    else:
        print("⚠️ Acesso negado, tente novamente ⚠️")
        time.sleep(1)

def menu_inicial(conn, nome):
    while True:
        time.sleep(1)
        print("\n 🏠 MENU INICIAL")
        time.sleep(1)
        print("    ➣  Selecione uma opção:")
        time.sleep(1)
        print("        ➣  1. Separar Medicamento")
        print("        ➣  2. Ver Histórico")
        print("        ➣  3. Sair")
        print("        ➣  4. Fechar programa")
        time.sleep(1)
        escolha = input("Digite o número da sua escolha: ")
        
        if escolha == "1":
            menu_de_separacao(conn, nome)
        elif escolha == "2":
            print(f"⚙ Carregando Histórico...")
            time.sleep(1)
            print(f" ⏳ HISTORICO:")
            time.sleep(1)
            historico(conn)
        elif escolha == "3":
            print("Saindo...")
            time.sleep(1)
            login(conn) 
        elif escolha == "4":
            print("⚙ Encerrando ...")
            time.sleep(1) 
            exit()
        else:
            print(" ⚠️ Escolha inválida! Tente novamente. ⚠️ ")
            time.sleep(1)
            menu_inicial(conn,)

def menu_de_separacao(conn, nome):
    medicamentos = {
        '1': 'Ibuprofeno',
        '2': 'Dorflex',
        '3': 'Buscopan',
        '4': 'Dipirona',
        '5': 'Paracetamol'
    }

    while True:
        time.sleep(1)
        print("\n 💊 MENU DE SEPARAÇÃO")
        time.sleep(1)
        print("    ➣  Selecione os medicamentos que deseja separar:")
        time.sleep(1)
        for chave, valor in medicamentos.items():
            print(f"        ➣  {chave}. {valor}")
        print("        ➣  6. Voltar")
        time.sleep(1)
        
        escolha = input("Digite os números dos medicamentos a serem separados separados por vírgula: ")
        
        # Se o usuário escolher voltar (opção 6)
        if escolha == '6':
            return  
            menu_inicial(conn, nome);
          
        escolhas = escolha.split(',')
        collect_list(escolhas)


        for num in escolhas:
            if num == '1':
                descricao = None
            elif num == '2':
                descricao = None
            elif num == '3':
                descricao = None
            elif num == '4':
                descricao = None
            elif num == '5':
                descricao = None

        # Inserir os dados na tabela `logs`
            try:
                cursor = conn.cursor()
            
            # Prepare os dados para a inserção
                query = '''
                INSERT INTO logs (datetime, responsavel, id_descricao)
                VALUES (?, ?, ?)
                '''
            
                # Dados a serem inseridos
                dados = (
                    10101010101,  # nome do usuário
                    True,  # tipo sempre será 'pedido'
                    descricao
                )
                
                cursor.execute(query, dados)
                conn.commit()
                
                print("\nSeparação registrada com sucesso!")
                menu_de_separacao(conn, nome)
            except Exception as e:
                print(f"Erro ao registrar a separação: {e}")
                menu_de_separacao(conn, nome)

def historico(conn):
    try:
        cursor = conn.cursor()
        
        # Query para buscar os logs com tipo 'pedido'
        query = '''
        SELECT data, user, paracetamol, dipirona, buscopam, dorflex, ibuprofeno
        FROM logs
        WHERE tipo = 'pedido'
        ORDER BY data DESC
        '''
        
        cursor.execute(query)
        logs = cursor.fetchall()
        
        if logs:
            for log in logs:
                data = log[0]  # data
                user = log[1]  # nome do usuário
                medicamentos = []
                
                # Verificar os medicamentos solicitados
                if log[2] == 1:
                    medicamentos.append("Paracetamol")
                if log[3] == 1:
                    medicamentos.append("Dipirona")
                if log[4] == 1:
                    medicamentos.append("Buscopan")
                if log[5] == 1:
                    medicamentos.append("Dorflex")
                if log[6] == 1:
                    medicamentos.append("Ibuprofeno")
                
                # Formatar e exibir a mensagem
                if medicamentos:
                    hora = data.split(" ")[1]  # Extrair a hora da data
                    print(f"\n No dia {data[:10]} às {hora}, {user} solicitou a separação dos medicamentos: {', '.join(medicamentos)}.")
                else:
                    print(f"No dia {data[:10]} às {hora}, Dobot separou ...") #AJUSTAR AQUI!!!
        else:
            print("Não há registros de pedidos.")
            
    except Exception as e:
        print(f"Erro ao consultar o histórico: {e}")
    finally:
        if cursor:
            cursor.close()

def wait_before_suction(delay_time: float = 2.5):

    print(f"Aguardando {delay_time} segundos para bipagem do medicamento...")
    time.sleep(delay_time)

def request_bip(timeout: int = 10):
    print("\U0001F551 Solicitando bipagem via HTTP...")
    try:
        response = requests.get("http://localhost:5000/qrcode-response", timeout=timeout)
        response.raise_for_status()
        scanned_medicine = response.json()
        print(f"\U0001F4E1 Medicamento bipado recebido: {scanned_medicine}")
        return scanned_medicine
    except requests.exceptions.RequestException as e:
        print(f"⏳ Falha ao obter bipagem: {e}")
        enviar_log("1", "15", "0")
        return None

def execute_movement(
    position: Annotated[Position, typer.Argument(help="Position data to determine and execute the appropriate movement.")],
    add_height: Annotated[int, typer.Argument(help="Additional height to be added to Z if it is the last position of the delivery.")] = 0
):
    spinner = yaspin(text=f"Moving to {position}...")
    current_position = Position()
    current_position.load_from_dict(position)

    current_position.z += add_height
    
    if position.get("move") == "move_l":
        dobot.move_l_to(current_position, wait=True)
    else:
        dobot.move_j_to(current_position, wait=True)
        
    spinner.stop()

def validate(bin_n):
    
    wait_before_suction()
    expected_medicine = data_med.get(bin_n, [])
    scanned_medicine = request_bip()
    print(expected_medicine)

    if scanned_medicine == expected_medicine:
        print("✅ Medicamento validado. Descendo para coletar...")
        return True
    
    else:
        print("⚠️ Medicamento inválido! Retornando ao home.")
        enviar_log("1", "18", "1")
        return False

def ir_sensor(timeout: int=10):
    print("\U0001F551 Verificando coleta")
    try:
        response = requests.get("http://localhost:5000/api/sensores", timeout=timeout)
        response.raise_for_status()
        status_coleta = response.json().get("caught")

        print(f"\U0001F4E1 Estado sensor IR: {status_coleta}")
        if status_coleta == "ALTO":
            return False
        elif status_coleta == "BAIXO":
            return True
    except requests.exceptions.RequestException as e:
        print(f"⏳ Falha ao obter leitura: {e}")
        return None

def check_suction(
    position: Annotated[Position, typer.Argument(help="Position data to check if suction should be enabled or disabled.")]
):
    if (position.get("suction")):
        dobot.enable_tool(100)
    else:
        dobot.disable_tool(100)

def take_medicine(
    bin: Annotated[str, typer.Argument(help="Name of the bin from which medicine should be taken.")],
    bin_n: Annotated[str, typer.Argument(help="Name of the bin from which medicine should be taken.")]
):
    positions = data.get(bin, [])
    
    if not positions:
        print(f"No data found for bin: {bin}")
        return
    
    first_position = positions[0]
    execute_movement(first_position)

    done = False
    if validate(bin_n):
        while (not done):
            for position in positions[1:]:
                check_suction(position)
                execute_movement(position)    
            
            time.sleep(1.5)
            done = ir_sensor()
                
        deliver()

def deliver():
    global deliver_value
    global add_height
    
    if deliver_value > 6:
        deliver_value = 1
        add_height += 20
            
    for index, position in enumerate(data[f"delivery_{deliver_value}"]):
        check_suction(position)
        
        if index != 1:
            execute_movement(position)
        else:
            execute_movement(position, add_height)
    deliver_value += 1
    enviar_log("1", "3", "1")

def devolution():
    positions = data.get("devolution", [])
    for positions in positions:
        check_suction(positions)
        execute_movement(positions)

def validate_fita():

    wait_before_suction()
    print("\U0001F551 Solicitando bipagem via HTTP...")
    try:
        response = requests.get("http://localhost:5000/qrcode-response")
        response.raise_for_status()
        scanned_medicine = response.json()
        if scanned_medicine.get("qr_code", "").startswith("A"):
            print(f"✅ Fita {scanned_medicine.get("qr_code")} validada. Descendo para coletar...")
            return True
        else:
            print("⚠️ Fita inválida! Retornando ao home.")

            return False
    except requests.exceptions.RequestException as e:
        print(f"⏳ Falha ao obter bipagem: {e}")
        return None

def get_qrcode():
    positions = data.get("qrcode", [])    
    first_position = positions[0]
    execute_movement(first_position)
    
    if validate_fita():
        for position in positions[1:]:
            check_suction(position)
            execute_movement(position)
        delivery_qrcode()
    
def delivery_qrcode():
    positions = data.get("delivery_qrcode", [])
    for position in positions:
            check_suction(position)
            execute_movement(position)

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
            
    enviar_log("1", "4", "1")

@cli.command()
def collect_list(input_list: Annotated[List[str], typer.Argument(help="Lista dos bins a coletar")]):
    global deliver_value
    deliver_value = 1
    main()
    positions = data.get('home')
    ordered_list = sorted(input_list)
    for bin_num in ordered_list:
        take_medicine(f'bin_{bin_num}', bin_num)
    get_qrcode()
    execute_movement(positions[0])
    enviar_log("1", "4", "1")

def main():
    available_ports = list_ports.comports()
    print(f'available ports: {[x.device for x in available_ports]} \n')
    port_input = input("Desired port number: ")
    port = available_ports[int(port_input)].device
    # port = available_ports[-1].device
    spinner = yaspin(text=f"Connecting with port {port}...")
    spinner.start()
    dobot.connect(port)
    dobot.set_speed(150, 150)
    spinner.stop()
    #cli()

if __name__ == "__main__":
    main()
    identidade_visual()
    conn = conectar_ao_banco()
     
    if conn:
        login(conn)
        conn.close() 
