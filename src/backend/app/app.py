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
    Recebe um JSON e insere os dados na tabela 'log' do banco SQLite.
    Espera que o JSON contenha: 'user_nome', 'qrcode' e 'presenca'.
    """
    data = request.get_json()
    if not data or "user_nome" not in data or "qrcode" not in data or "presenca" not in data:
        logger.warning("Dados incompletos recebidos: %s", data)
        return jsonify({"error": "Dados incompletos"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        qrcode_str = json.dumps(data.get("qrcode"))
        presenca_val = 1 if data.get("presenca") in [True, 1, "1"] else 0

        logger.debug("Inserindo log: user_nome=%s, qrcode=%s, presenca=%s",
                     data.get("user_nome"), qrcode_str, presenca_val)

        cursor.execute(
            "INSERT INTO log (user_nome, qrcode, presenca) VALUES (?, ?, ?)",
            (data.get("user_nome"), qrcode_str, presenca_val)
        )
        conn.commit()
        response_msg = "Dados inseridos no banco dbCli.sqlite com sucesso."
        status_code = 200
        logger.info("Log inserido com sucesso para o usuário: %s", data.get("user_nome"))
    except Exception as e:
        conn.rollback()
        response_msg = f"Erro ao inserir dados: {e}"
        status_code = 500
        logger.error("Erro ao inserir log: %s", e)
    finally:
        cursor.close()
        conn.close()

    return jsonify({"message": response_msg}), status_code

if __name__ == "__main__":
    init_db()  # Inicializa as tabelas ao iniciar o app
    app.run(debug=True)
