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

# Tabela Paciente
class Paciente(db.Model):
    __tablename__ = 'pacientes'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(300), nullable=False)
    leito = db.Column(db.Integer, nullable=False)
    logs = db.relationship('Log', backref='paciente', lazy=True)

# Tabela Bin
class Bin(db.Model):
    __tablename__ = 'bins'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_remedio = db.Column(db.Integer, db.ForeignKey('remedios.id'), nullable=False)
    localizacao = db.Column(db.Float, nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)

# Tabela Remédio
class Remedio(db.Model):
    __tablename__ = 'remedios'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome_do_remedio_com_gramagem = db.Column(db.String(300), nullable=False)
    qr_code = db.Column(db.Text, nullable=True)
    validade = db.Column(db.DateTime, nullable=False)

# Tabela Fita
class Fita(db.Model):
    __tablename__ = 'fitas'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    qr_code = db.Column(db.Text, nullable=False)
    hc = db.Column(db.Integer, nullable=False)
    id_prescricao = db.Column(db.Integer, nullable=False)
    status = db.Column(db.Text, nullable=False)
    data = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

# Tabela Log
class Log(db.Model):
    __tablename__ = 'logs'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    datetime = db.Column(db.DateTime, default=datetime.now(timezone.utc), nullable=False)
    descricao_id = db.Column(db.Integer, db.ForeignKey('descricoes.id'), nullable=False)
    responsavel = db.Column(db.Boolean, nullable=False)
    paciente_id = db.Column(db.Integer, db.ForeignKey('pacientes.id'), nullable=False)

# Função para popular o banco com dados
def popular_banco():
    with app.app_context():
        # Cria as tabelas no banco de dados
        db.create_all()

        # Criando Usuário se não existir
        usuario_existente = Usuario.query.filter_by(email="gabrielhenrique@gmail.com").first()
        if not usuario_existente:
            senha_hash = bcrypt.generate_password_hash("123456").decode('utf-8')
            usuario = Usuario(nome="Gabriel Henrique", email="gabrielhenrique@gmail.com", senha=senha_hash)
            db.session.add(usuario)

        # Criando Pacientes de exemplo
        if not Paciente.query.first():
            pacientes = [
                {"nome": "João Silva", "leito": 101},
                {"nome": "Maria Oliveira", "leito": 102},
                {"nome": "Carlos Souza", "leito": 103},
                {"nome": "Luciana Ferreira", "leito": 104}
            ]
            for paciente_data in pacientes:
                paciente = Paciente(nome=paciente_data["nome"], leito=paciente_data["leito"])
                db.session.add(paciente)

        # Criando Remédios de exemplo
        if not Remedio.query.first():
            remedios = [
                {"nome_do_remedio_com_gramagem": "Paracetamol 500mg", "validade": datetime(2025, 5, 15)},
                {"nome_do_remedio_com_gramagem": "Amoxicilina 250mg", "validade": datetime(2025, 12, 1)},
                {"nome_do_remedio_com_gramagem": "Ibuprofeno 200mg", "validade": datetime(2025, 10, 1)}
            ]
            for remedio_data in remedios:
                remedio = Remedio(nome_do_remedio_com_gramagem=remedio_data["nome_do_remedio_com_gramagem"],
                                  validade=remedio_data["validade"])
                db.session.add(remedio)

        # Criando Bins de exemplo
        if not Bin.query.first():
            bins = [
                {"id_remedio": 1, "localizacao": 45.123, "quantidade": 100},
                {"id_remedio": 2, "localizacao": 45.124, "quantidade": 50},
                {"id_remedio": 3, "localizacao": 45.125, "quantidade": 150}
            ]
            for bin_data in bins:
                bin = Bin(id_remedio=bin_data["id_remedio"], localizacao=bin_data["localizacao"], quantidade=bin_data["quantidade"])
                db.session.add(bin)

        # Criando Fitas de exemplo
        if not Fita.query.first():
            fitas = [
                {"qr_code": "qr123", "hc": 12345, "id_prescricao": 1, "status": "prescrição enviada"},
                {"qr_code": "qr124", "hc": 12346, "id_prescricao": 2, "status": "separando fita"},
                {"qr_code": "qr125", "hc": 12347, "id_prescricao": 3, "status": "remédio separado"}
            ]
            for fita_data in fitas:
                fita = Fita(qr_code=fita_data["qr_code"], hc=fita_data["hc"], id_prescricao=fita_data["id_prescricao"], status=fita_data["status"])
                db.session.add(fita)

        # Criando Descrições se não existirem
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

        # Criando Logs de exemplo
        if not Log.query.first():
            logs = [
                {"descricao_id": 1, "responsavel": True, "paciente_id": 1},
                {"descricao_id": 3, "responsavel": False, "paciente_id": 2},
                {"descricao_id": 5, "responsavel": True, "paciente_id": 3}
            ]
            for log_data in logs:
                log = Log(descricao_id=log_data["descricao_id"], responsavel=log_data["responsavel"], paciente_id=log_data["paciente_id"])
                db.session.add(log)

        # Commit todas as mudanças no banco
        db.session.commit()
        print("Banco de dados populado com sucesso!")

# Rodar as funções
if __name__ == "__main__":
    popular_banco()
