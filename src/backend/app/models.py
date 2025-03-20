from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# Tabela Usuario
class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)  # Id_user (serial)
    nome = db.Column(db.String(300), nullable=False)                  # Nome
    email = db.Column(db.String(345), unique=True, nullable=False)    # Email
    senha = db.Column(db.Text, nullable=False)                        # Senha


# Tabela Paciente
class Paciente(db.Model):
    __tablename__ = 'pacientes'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)  # Id (serial)
    nome = db.Column(db.String(300), nullable=False)                  # Nome do paciente
    leito = db.Column(db.Integer, nullable=False)                     # Leito
    logs = db.relationship('Log', backref='paciente', lazy=True)      # Relação com logs


# Tabela Bin
class Bin(db.Model):
    __tablename__ = 'bins'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)                  # Id_bin (serial)
    id_remedio = db.Column(db.Integer, db.ForeignKey('remedios.id'), nullable=False)  # Id_remedio (chave estrangeira para Remédio)
    localizacao = db.Column(db.Float, nullable=False)                                 # Localização
    quantidade = db.Column(db.Integer, nullable=False)                                # Quantidade


# Tabela Remédio
class Remedio(db.Model):
    __tablename__ = 'remedios'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)          # Id_remedio (serial)
    nome_do_remedio_com_gramagem = db.Column(db.String(300), nullable=False)  # Nome do remédio com gramagem
    qr_code = db.Column(db.Text, nullable=True)                               # QR_Code (armazenado como texto)
    validade = db.Column(db.DateTime, nullable=False)                         # Validade


# Tabela Fita
class Fita(db.Model):
    __tablename__ = 'fitas'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)  # Id_fita (serial)
    qr_code = db.Column(db.Text, nullable=False)                      # QR_code (armazenado como texto, svg)
    hc = db.Column(db.Integer, nullable=False)                        # HC #
    id_prescricao = db.Column(db.Integer, nullable=False)             # Id_prescrição
    status = db.Column(db.Text, nullable=False)                       # Status


# Tabela de Descrições (todas as descrições pré-definidas)
class Descricao(db.Model):
    __tablename__ = 'descricoes'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)  # ID da descrição
    descricao = db.Column(db.String(500), nullable=False)             # Texto da descrição

    # Relação com logs
    logs = db.relationship('Log', backref='descricao', lazy=True)

# Tabela Logs (armazena os eventos e vincula com a descrição)
class Log(db.Model):
    __tablename__ = 'logs'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)                                # id_log (serial)
    datetime = db.Column(db.DateTime, default=datetime.now(datetime.timezone.utc), nullable=False)  # datetime
    descricao_id = db.Column(db.Integer, db.ForeignKey('descricoes.id'), nullable=False)            # ID da descrição
    responsavel = db.Column(db.Boolean, nullable=False)                                             # Responsável (farm, dobot)
    paciente_id = db.Column(db.Integer, db.ForeignKey('pacientes.id'), nullable=False)              # Paciente (referência para paciente)

# Função para inserir descrições iniciais
def criar_descricoes_iniciais():
    # Verifica se a tabela de Descrições já está populada, se não, insere os valores
    if not Descricao.query.first():  # Verifica se a tabela já possui dados
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
        
        # Adiciona todas as descrições na tabela
        for descricao in descricoes:
            nova_descricao = Descricao(descricao=descricao)
            db.session.add(nova_descricao)
        db.session.commit()