import time
from termcolor import colored
import psycopg2
from getpass import getpass

# Função para fazer a identidade visual
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

# Função para conectar ao banco de dados
def conectar_ao_banco():
    print(f"⚙ Conectando ao banco de dados...")
    time.sleep(2)
    try:
        conn = psycopg2.connect(
            dbname="Prescrito o DataBase",  
            user="cli",      
            password="cliprescript",    
            host="10.128.0.49",        
            port="5433"  
        )
        print("Conectado!") 
        return conn
    except Exception as e:
        print(f" ⚠️  Erro ao conectar ao banco de dados: {e}")
        return None

# Função para autenticação
def query_login(conn, nome, senha):
    if conn is None:
        return False  # Se a conexão não estiver ativa, retorna False
    
    try:
        cursor = conn.cursor()
        query = 'SELECT "senha" FROM "Users" WHERE "nome" = %s'
        cursor.execute(query, (nome,))
        resultado = cursor.fetchone()
        
        if resultado:
            senha_correta = resultado[0]
            return senha == senha_correta  # Comparação direta (deve ser hash no futuro!)
        else:
            return False  # Usuário não encontrado
    except Exception as e:
        print(f" ⚠️  Erro na consulta ao banco: {e} ⚠️")
        return False
    finally:
        cursor.close()

# Função de login
def login(conn):
    time.sleep(2)
    print("\n👤 LOGIN")
    nome = input("    ➣  Digite seu nome: ")
    senha = getpass("    ➣  Digite sua senha: ")  # Oculta a senha ao digitar

    if query_login(conn, nome, senha):
        time.sleep(1)
        print("\n Bem-vindo(a)", nome) 
        menu_inicial(conn)  
    else:
        time.sleep(1)
        print("⚠️  Acesso negado, tente novamente ⚠️")
        time.sleep(1)
        login(conn)  

# Menu inicial
def menu_inicial(conn):
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
            print("Ops... Parece que essa funcionalidade não está pronta.")
        elif escolha == "2":
            historico()
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
            menu_inicial(conn)

# Query para pesquisar os logs(historico)
# def query_historico(conn, nome, tipo):

# Histórico
def historico(conn):
    time.sleep(2)
    print("\n 🕑HISTÓRICO DE LOGS")
    
if __name__ == "__main__":
    identidade_visual() 
    conn = conectar_ao_banco()
    
    if conn:
        login(conn)
        conn.close()  # Fecha a conexão ao final do programa