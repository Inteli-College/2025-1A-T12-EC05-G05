import os
import sqlite3
import time
from termcolor import colored
from getpass import getpass
import json
import sys

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
    time.sleep(2)
    
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

#Login
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

# Menu inicial
def menu_inicial(conn, nome):
    while True:
        time.sleep(2)
        print("\n 🏠 MENU INICIAL")
        time.sleep(2)
        print("    ➣  Selecione uma opção:")
        time.sleep(1)
        print("        ➣  1. Separar Medicamento")
        print("        ➣  2. Ver Histórico")
        print("        ➣  3. Sair")
        print("        ➣  4. Fechar programa")
        time.sleep(2)
        escolha = input("Digite o número da sua escolha: ")
        
        if escolha == "1":
            menu_de_separacao(conn, nome)
        elif escolha == "2":
            print(f"⚙ Carregando Histórico...")
            time.sleep(2)
            print(f" ⏳ HISTORICO:")
            time.sleep(1)
            historico(conn)
        elif escolha == "3":
            print("Saindo...")
            time.sleep(2)
            login(conn) 
        elif escolha == "4":
            print("⚙ Encerrando ...")
            time.sleep(2) 
            break
        else:
            print(" ⚠️ Escolha inválida! Tente novamente. ⚠️ ")
            time.sleep(2)
            menu_inicial(conn,)

    
# Menu de separação --> ADICIONAR COISAS DO ROBO
def menu_de_separacao(conn, nome):
    medicamentos = {
        '1': 'Paracetamol',
        '2': 'Dipirona',
        '3': 'Buscopan',
        '4': 'Dorflex',
        '5': 'Ibuprofeno'
    }

    while True:
        time.sleep(2)
        print("\n 💊 MENU DE SEPARAÇÃO")
        time.sleep(2)
        print("    ➣  Selecione os medicamentos que deseja separar:")
        time.sleep(1)
        for chave, valor in medicamentos.items():
            print(f"        ➣  {chave}. {valor}")
        print("        ➣  6. Voltar")
        time.sleep(2)
        
        escolha = input("Digite os números dos medicamentos a serem separados separados por vírgula: ")
        
        # Se o usuário escolher voltar (opção 6)
        if escolha == '6':
            return  
            menu_inicial(conn, nome);
          
        escolhas = escolha.split(',')

        # Verifica se há números repetidos na escolha
        if len(escolhas) != len(set(escolhas)):
            print("\nInfelizmente só temos uma unidade de medicamento em cada bin. Tente novamente.")
        else:
            # Se não houver repetição, define os valores para os medicamentos selecionados
            medicamentos_selecionados = {
                'paracetamol': 0,
                'dipirona': 0,
                'buscopam': 0,
                'dorflex': 0,
                'ibuprofeno': 0
            }

            for num in escolhas:
                if num == '1':
                    medicamentos_selecionados['paracetamol'] = 1
                elif num == '2':
                    medicamentos_selecionados['dipirona'] = 1
                elif num == '3':
                    medicamentos_selecionados['buscopam'] = 1
                elif num == '4':
                    medicamentos_selecionados['dorflex'] = 1
                elif num == '5':
                    medicamentos_selecionados['ibuprofeno'] = 1

            # Inserir os dados na tabela `logs`
            try:
                cursor = conn.cursor()
                
                # Prepare os dados para a inserção
                query = '''
                INSERT INTO logs (user, tipo, paracetamol, dipirona, buscopam, dorflex, ibuprofeno, erro, qr_code, bin)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                '''
                
                # Dados a serem inseridos
                dados = (
                    nome,  # nome do usuário
                    'pedido',  # tipo sempre será 'pedido'
                    medicamentos_selecionados['paracetamol'],
                    medicamentos_selecionados['dipirona'],
                    medicamentos_selecionados['buscopam'],
                    medicamentos_selecionados['dorflex'],
                    medicamentos_selecionados['ibuprofeno'],
                    None,  # erro (deixa vazio se não houver erro)
                    None,  # qr_code (deixa vazio)
                    None
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


#MAIN
if __name__ == "__main__":
    identidade_visual()
    conn = conectar_ao_banco()
     
    if conn:
        login(conn)
        conn.close()  # Fecha a conexão ao final do programa
  

