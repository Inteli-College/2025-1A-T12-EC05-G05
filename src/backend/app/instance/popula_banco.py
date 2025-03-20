from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from datetime import datetime, timezone
import os

app = Flask(__name__)

# Caminho absoluto para o banco de dados
basedir = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{os.path.join(basedir, 'db.sqlite')}"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# Tabela Usuario
class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(300), nullable=False)
    email = db.Column(db.String(345), unique=True, nullable=False)
    senha = db.Column(db.Text, nullable=False)

# Tabela Descrição
class Descricao(db.Model):
    __tablename__ = 'descricoes'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    descricao = db.Column(db.String(500), nullable=False)

# Função para criar o banco e popular com dados
def popular_banco():
    with app.app_context():
        # Cria as tabelas no banco de dados
        db.create_all()

        # Verifica se o usuário já existe
        usuario_existente = Usuario.query.filter_by(email="gabrielhenrique@gmail.com").first()
        if not usuario_existente:
            # Criação de um novo usuário com senha criptografada
            senha_hash = bcrypt.generate_password_hash("123456").decode('utf-8')
            usuario = Usuario(nome="Gabriel Henrique", email="gabrielhenrique@gmail.com", senha=senha_hash)
            db.session.add(usuario)

        # Adiciona descrições se não existirem
        if not Descricao.query.first():
            descricoes = [
                "prescrição enviada --> esperando autorização",
                "autorizar a separação --> pronto para separação",
                "separando fita --> separando",
                "remédio separado",
                "fita separada --> separada",
                "cancelamento da separação --> fita pausada",
                "fita em uso --> em uso",
                "fita devolvida(ao menos o qrcode) --> fita finalizada",
                "fita não entregue no prazo --> fita atrasada",
                "bin com lote vencido",
                "bin vazio",
                "reabastecimento do bin",
                "sem sinal de wifi",
                "desligamento (sem luz)",
                "alerta de manutenção",
                "não conseguiu ler o QRCode"
            ]
            for descricao in descricoes:
                nova_descricao = Descricao(descricao=descricao)
                db.session.add(nova_descricao)

        # Commit todas as mudanças no banco
        db.session.commit()
        print("Banco de dados populado com sucesso!")

# Chama a função para popular o banco
if __name__ == "__main__":
    popular_banco()
