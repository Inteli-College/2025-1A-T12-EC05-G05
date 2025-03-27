from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from datetime import datetime, timedelta
import os

app = Flask(__name__)

# Caminho absoluto para o banco de dados
basedir = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{os.path.join(basedir, 'db.sqlite')}"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# Tabela de Associação: Muitos-para-Muitos
fita_remedio = db.Table(
    'fita_remedio', 
    db.Column('fita_id', db.Integer, db.ForeignKey('fitas.id'), primary_key=True),
    db.Column('remedio_id', db.Integer, db.ForeignKey('remedios.id'), primary_key=True)
)

# Tabela Usuario
class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(300), nullable=False)
    email = db.Column(db.String(345), unique=True, nullable=False)
    senha = db.Column(db.Text, nullable=False)

# Tabela Paciente
class Paciente(db.Model):
    __tablename__ = 'pacientes'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(300), nullable=False)
    leito = db.Column(db.Integer, nullable=False)
    fitas = db.relationship('Fita', backref='paciente', lazy=True)

# Tabela Remédio
class Remedio(db.Model):
    __tablename__ = 'remedios'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome_do_remedio_com_gramagem = db.Column(db.String(300), nullable=False)
    qr_code = db.Column(db.Text, nullable=True)
    validade = db.Column(db.DateTime, nullable=False)
    fitas = db.relationship('Fita', secondary=fita_remedio, back_populates='remedios')

# Tabela Fita
class Fita(db.Model):
    __tablename__ = 'fitas'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    qr_code = db.Column(db.Text, nullable=False)
    hc = db.Column(db.Integer, nullable=False)
    id_prescricao = db.Column(db.Integer, db.ForeignKey('pacientes.id'), nullable=False)
    status = db.Column(db.Text, nullable=False)
    remedios = db.relationship('Remedio', secondary=fita_remedio, back_populates='fitas')

# Tabela Descrição
class Descricao(db.Model):
    __tablename__ = 'descricoes'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    descricao = db.Column(db.String(500), nullable=False)

def popular_banco():
    with app.app_context():
        # Limpa o banco de dados existente
        db.drop_all()
        db.create_all()

        # Criação de usuário
        senha_hash = bcrypt.generate_password_hash("123456").decode('utf-8')
        usuario = Usuario(nome="Gabriel Henrique", email="gabrielhenrique@gmail.com", senha=senha_hash)
        db.session.add(usuario)

        # Descrições
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

        # Criação de Pacientes
        pacientes = [
            Paciente(nome="João Silva", leito=10),
            Paciente(nome="Maria Souza", leito=15),
            Paciente(nome="Pedro Santos", leito=20),
            Paciente(nome="Ana Oliveira", leito=25),  # Novo paciente
            Paciente(nome="Carlos Almeida", leito=30),  # Novo paciente
            Paciente(nome="Pedro Almeida", leito=35),
            Paciente(nome="Alana dos Santos", leito=40),  # Novo paciente
            Paciente(nome="Jaiminho dávila", leito=45),  # Novo paciente
            Paciente(nome="Igor Sampaio", leito=50),
        ]
        db.session.add_all(pacientes)
        
        # Commit pacientes para garantir que tenham IDs
        db.session.flush()

        # Criação de Remédios
        remedios = [
            # Remédios para o primeiro paciente
            Remedio(nome_do_remedio_com_gramagem="Dipirona 500mg", validade=datetime.now() + timedelta(days=365), qr_code="QR001"),
            Remedio(nome_do_remedio_com_gramagem="Amoxicilina 250mg", validade=datetime.now() + timedelta(days=270), qr_code="QR002"),
            Remedio(nome_do_remedio_com_gramagem="Ibuprofeno 200mg", validade=datetime.now() + timedelta(days=180), qr_code="QR003"),
            Remedio(nome_do_remedio_com_gramagem="Paracetamol 750mg", validade=datetime.now() + timedelta(days=240), qr_code="QR004"),
            
            # Remédios para o segundo paciente
            Remedio(nome_do_remedio_com_gramagem="Metformina 850mg", validade=datetime.now() + timedelta(days=300), qr_code="QR005"),
            Remedio(nome_do_remedio_com_gramagem="Losartana 50mg", validade=datetime.now() + timedelta(days=210), qr_code="QR006"),
            Remedio(nome_do_remedio_com_gramagem="Sinvastatina 20mg", validade=datetime.now() + timedelta(days=270), qr_code="QR007"),
            Remedio(nome_do_remedio_com_gramagem="Atenolol 50mg", validade=datetime.now() + timedelta(days=180), qr_code="QR008"),
            
            # Remédios para o terceiro paciente
            Remedio(nome_do_remedio_com_gramagem="Ciprofloxacino 500mg", validade=datetime.now() + timedelta(days=240), qr_code="QR009"),
            Remedio(nome_do_remedio_com_gramagem="Omeprazol 20mg", validade=datetime.now() + timedelta(days=300), qr_code="QR010"),
            Remedio(nome_do_remedio_com_gramagem="Nimesulida 100mg", validade=datetime.now() + timedelta(days=180), qr_code="QR011"),
            Remedio(nome_do_remedio_com_gramagem="Citalopram 20mg", validade=datetime.now() + timedelta(days=270), qr_code="QR012"),

            Remedio(nome_do_remedio_com_gramagem="Cetoprofeno 100mg", validade=datetime.now() + timedelta(days=365), qr_code="QR013"),
            Remedio(nome_do_remedio_com_gramagem="Ranitidina 150mg", validade=datetime.now() + timedelta(days=240), qr_code="QR014"),
            Remedio(nome_do_remedio_com_gramagem="Loratadina 10mg", validade=datetime.now() + timedelta(days=300), qr_code="QR015"),
            Remedio(nome_do_remedio_com_gramagem="Aspirina 500mg", validade=datetime.now() + timedelta(days=180), qr_code="QR016"),
            Remedio(nome_do_remedio_com_gramagem="Diclofenaco 50mg", validade=datetime.now() + timedelta(days=210), qr_code="QR017")
        ]
        db.session.add_all(remedios)

        # Criação de Fitas
        fitas = [
        Fita(qr_code="FITA001", hc=1001, id_prescricao=pacientes[0].id, status="pendente"),
        Fita(qr_code="FITA002", hc=1002, id_prescricao=pacientes[1].id, status="em_progresso"),
        Fita(qr_code="FITA003", hc=1003, id_prescricao=pacientes[2].id, status="finalizada"),
        Fita(qr_code="FITA004", hc=1004, id_prescricao=pacientes[3].id, status="pendente"),
        Fita(qr_code="FITA005", hc=1005, id_prescricao=pacientes[4].id, status="em_progresso"),
        Fita(qr_code="FITA006", hc=1006, id_prescricao=pacientes[5].id, status="finalizada"),
        Fita(qr_code="FITA007", hc=1007, id_prescricao=pacientes[6].id, status="pendente"),
        Fita(qr_code="FITA008", hc=1008, id_prescricao=pacientes[7].id, status="em_progresso"),
        Fita(qr_code="FITA009", hc=1009, id_prescricao=pacientes[8].id, status="finalizada"),
        ]

        # Associar remédios às fitas
        fitas[0].remedios.extend(remedios[0:4])
        fitas[1].remedios.extend(remedios[4:8])
        fitas[2].remedios.extend(remedios[8:12])
        fitas[3].remedios.extend(remedios[12:13])
        fitas[4].remedios.extend(remedios[13:14])
        fitas[5].remedios.extend(remedios[14:15])
        fitas[6].remedios.extend(remedios[15:16])
        fitas[7].remedios.extend(remedios[16:17])
        fitas[8].remedios.extend(remedios[0:6])

        db.session.add_all(fitas)

        # Commit todas as mudanças no banco
        db.session.commit()
        print("Banco de dados populado com sucesso!")

# Chama a função para popular o banco
if __name__ == "__main__":
    popular_banco()