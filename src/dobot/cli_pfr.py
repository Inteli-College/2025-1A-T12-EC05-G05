import os
import sqlite3
import time
import logging
from termcolor import colored
from getpass import getpass
import json
import sys

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("cli.log", encoding='utf-8'),
    ]
)
logger = logging.getLogger(__name__)

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

def forcar_recriacao_banco():
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        db_dir = os.path.join(current_dir, "..", "instance")
        db_path = os.path.join(db_dir, "dbCli.sqlite")
        db_path = os.path.normpath(db_path)
        
        if os.path.exists(db_path):
            os.remove(db_path)
        
        os.makedirs(db_dir, exist_ok=True)
        
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS user (
            nome TEXT PRIMARY KEY,
            senha TEXT NOT NULL
        )
        ''')
        
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_nome TEXT,
            qrcode TEXT,
            presenca INTEGER,
            FOREIGN KEY (user_nome) REFERENCES user(nome)
        )
        ''')
        
        usuarios = [
            ("João", "senha123"),
            ("Maria", "senha456"),
            ("Pedro", "senha789")
        ]
        
        cursor.executemany("""
        INSERT INTO user (nome, senha)
        VALUES (?, ?)
        """, usuarios)
        
        logs = [
            ("João", json.dumps({"codigo": "QR_A1"}), 1),
            ("Maria", json.dumps({"codigo": "QR_B2"}), 0),
            ("Pedro", json.dumps({"codigo": "QR_C3"}), 1),
            ("Pedro", json.dumps({"codigo": "QR_Cdsasdas3"}), 1),
            ("Pedro", json.dumps({"codigo": "QR_Cdsada3"}), 1)


        ]
        
        cursor.executemany("""
        INSERT INTO log (user_nome, qrcode, presenca)
        VALUES (?, ?, ?)
        """, logs)
        
        conn.commit()
        return conn
    except Exception as e:
        logger.error(f"Erro ao recriar banco de dados: {e}")
        return None

def conectar_ao_banco():
    time.sleep(1)
    conn = forcar_recriacao_banco()
    if conn:
        return conn
    
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        db_path = os.path.join(current_dir, "..", "instance", "dbCli.sqlite")
        db_path = os.path.normpath(db_path)
        
        if not os.path.exists(db_path):
            return None
            
        conn = sqlite3.connect(db_path)
        conn.text_factory = str
        return conn
    except Exception as e:
        logger.error(f"Erro ao conectar ao banco de dados: {e}")
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
            return senha == senha_correta
        else:
            return False
    except Exception as e:
        logger.error(f"Erro na consulta ao banco durante login: {e}")
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
        logger.error(f"Erro ao consultar logs do usuário: {e}")
        return []
    finally:
        if cursor:
            cursor.close()

def login(conn, tentativa=1):
    if tentativa > 3:
        print("\n⛔ Número máximo de tentativas excedido. Encerrando programa.")
        return False
        
    time.sleep(1)
    print("\n👤 LOGIN")
    print("Usuários disponíveis: João, Maria, Pedro")
    nome = input("    ➣  Digite seu nome: ")
    senha = getpass("    ➣  Digite sua senha: ")
    
    autenticado = query_login(conn, nome, senha)
    if autenticado:
        time.sleep(1)
        print("\nBem-vindo(a)", nome)
        
        logs = buscar_logs_usuario(conn, nome)
        if logs:
            print("\nLogs existentes para o usuário:")
            for log in logs:
                qrcode_data = log[1]
                try:
                    qrcode_info = json.loads(qrcode_data)
                    qrcode_display = qrcode_info.get("codigo", qrcode_data)
                except:
                    qrcode_display = qrcode_data
                        
                print(f"ID: {log[0]}, QR Code: {qrcode_display}, Presença: {'Sim' if log[2] == 1 else 'Não'}")
        else:
            print("\nNenhum log encontrado para o usuário.")
        
        return True
    else:
        print("⚠️ Acesso negado, tente novamente ⚠️")
        time.sleep(1)
        return login(conn, tentativa + 1)

if __name__ == "__main__":
    identidade_visual()
    conn = conectar_ao_banco()
    if conn:
        try:
            login_successful = login(conn)
        except Exception as e:
            print(f"\n⚠️ Ocorreu um erro inesperado: {e}")
        finally:
            conn.close()
    else:
        print("\n⚠️ Não foi possível conectar ao banco de dados.")