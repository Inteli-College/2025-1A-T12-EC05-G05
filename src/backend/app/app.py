import os
import sqlite3
import json
import logging
from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session
from config import ApplicationConfig
from models import db, User

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("cli.log", encoding='utf-8'),
    ]
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()

def get_db_connection():
    """
    Conecta ao banco SQLite utilizando o caminho:
    src/dobot/instance/dbCli.sqlite
    Sabendo que estamos em src/backend/app, o caminho relativo é:
    ../../dobot/instance/dbCli.sqlite
    """
    current_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(current_dir, "..", "..", "dobot", "instance", "dbCli.sqlite")
    db_path = os.path.normpath(db_path)
    logger.debug("Tentando conectar ao banco de dados em: %s", db_path)
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    logger.debug("Conexão com o banco estabelecida com sucesso.")
    return conn

def init_db():
    """
    Cria as tabelas necessárias no banco de dados, incluindo a tabela de teste.
    Essa função é executada logo que o app inicia.
    """
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        # Cria a tabela 'user'
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS user (
                nome TEXT PRIMARY KEY,
                senha TEXT NOT NULL
            );
        """)
        # Cria a tabela 'log'
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS log (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_nome TEXT,
                qrcode TEXT,
                presenca INTEGER,
                FOREIGN KEY (user_nome) REFERENCES user(nome)
            );
        """)
        # Cria a tabela 'teste' para verificação
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS teste (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                valor TEXT
            );
        """)
        conn.commit()
        logger.info("Banco de dados inicializado com as tabelas: user, log e teste.")
    except Exception as e:
        logger.error("Erro ao inicializar o banco de dados: %s", e)
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email
    })

@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None
    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id
    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    session["user_id"] = user.id
    return jsonify({
        "id": user.id,
        "email": user.email
    })

@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"

@app.route("/print-response", methods=["POST"])
def print_response():
    """
    Recebe um payload em formato de texto (plain text) e insere esse mesmo texto
    na coluna 'qrcode' da tabela 'log' do banco SQLite.
    
    Exemplo de payload (enviado como text/plain):
    {"medicamento": "Paracetamol 500mg", "validade": "2026-08-15", "lote": "ABC12345"}
    """
    txt_data = request.get_data(as_text=True)
    if not txt_data:
        logger.warning("Nenhum dado de texto recebido.")
        return jsonify({"error": "Dados incompletos"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        logger.debug("Inserindo QR Code como texto: %s", txt_data)

        cursor.execute(
            "INSERT INTO log (qrcode) VALUES (?)",
            (txt_data,)
        )
        conn.commit()
        response_msg = "QR Code inserido no banco dbCli.sqlite com sucesso."
        status_code = 200
        logger.info("QR Code inserido com sucesso.")
    except Exception as e:
        conn.rollback()
        response_msg = f"Erro ao inserir QR Code: {e}"
        status_code = 500
        logger.error("Erro ao inserir QR Code: %s", e)
    finally:
        cursor.close()
        conn.close()

    return jsonify({"message": response_msg}), status_code

@app.route("/qrcode-response", methods=["GET"])
def latest_qr_code():
    """
    Consulta e retorna a última (mais recente) informação da coluna 'qrcode'
    da tabela 'log' do banco SQLite.
    """
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        logger.debug("Consultando o último QR Code inserido na tabela log.")
        cursor.execute("SELECT qrcode FROM log ORDER BY id DESC LIMIT 1")
        row = cursor.fetchone()
        if row:
            latest_qrcode = row["qrcode"]
            logger.info("Último QR Code recuperado com sucesso.")
            return jsonify({"qrcode": latest_qrcode}), 200
        else:
            logger.info("Nenhum QR Code encontrado na tabela log.")
            return jsonify({"message": "Nenhum QR Code encontrado."}), 404
    except Exception as e:
        logger.error("Erro ao buscar o último QR Code: %s", e)
        return jsonify({"error": f"Erro ao buscar o último QR Code: {e}"}), 500
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    init_db()  # Inicializa as tabelas ao iniciar o app
    app.run(debug=True)
