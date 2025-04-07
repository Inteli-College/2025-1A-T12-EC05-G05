import random
from datetime import datetime, timedelta, timezone
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

app = Flask(__name__)

basedir = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{os.path.join(basedir, '.', 'instance', 'db.sqlite')}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

fita_remedio = db.Table('fita_remedio',
    db.Column('fita_id', db.Integer, db.ForeignKey('fitas.id'), primary_key=True),
    db.Column('remedio_id', db.Integer, db.ForeignKey('remedios.id'), primary_key=True)
)

class Historico(db.Model):
    __tablename__ = 'historico'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100))
    descricao = db.Column(db.String(255))
    data_registro = db.Column(db.DateTime)

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(300), nullable=False)
    email = db.Column(db.String(345), unique=True, nullable=False)
    senha = db.Column(db.Text, nullable=False)

class Descricao(db.Model):
    __tablename__ = 'descricoes'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    descricao = db.Column(db.String(500), nullable=False)

class Paciente(db.Model):
    __tablename__ = 'pacientes'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(300), nullable=False)
    leito = db.Column(db.Integer, nullable=False)
    logs = db.relationship('Log', backref='paciente', lazy=True)

class Bin(db.Model):
    __tablename__ = 'bins'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_remedio = db.Column(db.Integer, db.ForeignKey('remedios.id'), nullable=False)
    localizacao = db.Column(db.Float, nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)

class Remedio(db.Model):
    __tablename__ = 'remedios'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome_do_remedio_com_gramagem = db.Column(db.String(300), nullable=False)
    qr_code = db.Column(db.Text, nullable=True)
    validade = db.Column(db.DateTime, nullable=False)

class Fita(db.Model):
    __tablename__ = 'fitas'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    qr_code = db.Column(db.Text, nullable=False)
    hc = db.Column(db.Integer, nullable=False)
    id_prescricao = db.Column(db.Integer, nullable=False)
    status = db.Column(db.Text, nullable=False)
    remedios = db.relationship('Remedio', secondary=fita_remedio, lazy='subquery', backref=db.backref('fitas', lazy=True))

class Log(db.Model):
    __tablename__ = 'logs'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    datetime = db.Column(db.DateTime, default=datetime.now(timezone.utc), nullable=False)
    descricao_id = db.Column(db.Integer, db.ForeignKey('descricoes.id'), nullable=False)
    responsavel = db.Column(db.Boolean, nullable=False)
    paciente_id = db.Column(db.Integer, db.ForeignKey('pacientes.id'))

def popular_banco():
    with app.app_context():
        db.drop_all()
        db.create_all()

        try:
            Historico.query.delete()
            Log.query.delete()
            Fita.query.delete()
            Bin.query.delete()
            Remedio.query.delete() 
            Descricao.query.delete()
            Paciente.query.delete()
            Usuario.query.delete()
            db.session.commit()
            print("Tabelas limpas com sucesso!")
        except Exception as e:
            db.session.rollback()
            print(f"Erro ao limpar tabelas: {e}")
            return

        try:
            senha_hash = bcrypt.generate_password_hash("123456").decode('utf-8')
            usuario = Usuario(nome="Gabriel Henrique", email="gabrielhenrique@gmail.com", senha=senha_hash)
            db.session.add(usuario)
            db.session.flush()

            pacientes = [
                {"nome": "João Silva", "leito": 101},
                {"nome": "Maria Oliveira", "leito": 102},
                {"nome": "Carlos Souza", "leito": 103},
                {"nome": "Luciana Ferreira", "leito": 104},
                {"nome": "Fernanda Lima", "leito": 105},
                {"nome": "Lucas Costa", "leito": 106},
                {"nome": "Ana Santos", "leito": 107},
                {"nome": "Pedro Souza", "leito": 108},
                {"nome": "Camila Rocha", "leito": 109},
                {"nome": "Rafael Pereira", "leito": 110}
            ]
            pacientes_criados = []
            for paciente_data in pacientes:
                paciente = Paciente(nome=paciente_data["nome"], leito=paciente_data["leito"])
                db.session.add(paciente)
                pacientes_criados.append(paciente)
            db.session.flush()

            remedios = [
                {"nome_do_remedio_com_gramagem": "Ibuprofeno 400mg", "validade": datetime(2025, 5, 15)},
                {"nome_do_remedio_com_gramagem": "Dorflex 300mg", "validade": datetime(2025, 12, 1)},
                {"nome_do_remedio_com_gramagem": "Buscopan 10mg", "validade": datetime(2025, 10, 1)},
                {"nome_do_remedio_com_gramagem": "Dipirona 1g", "validade": datetime(2025, 7, 10)},
                {"nome_do_remedio_com_gramagem": "Paracetamol 500mg", "validade": datetime(2025, 11, 21)}
            ]
            remedios_criados = []
            for remedio_data in remedios:
                remedio = Remedio(nome_do_remedio_com_gramagem=remedio_data["nome_do_remedio_com_gramagem"],
                                  validade=remedio_data["validade"])
                db.session.add(remedio)
                remedios_criados.append(remedio)
            db.session.flush()

            for i, remedio in enumerate(remedios_criados):
                bin = Bin(
                    id_remedio=remedio.id, 
                    localizacao=45.123 + i * 0.001, 
                    quantidade=50 + i * 50
                )
                db.session.add(bin)
            db.session.flush()

            fitas = [
                {"qr_code": "qr123", "hc": 12345, "id_prescricao": 1, "status": "finalizada"},
                {"qr_code": "qr124", "hc": 12346, "id_prescricao": 2, "status": "finalizada"},
                {"qr_code": "qr125", "hc": 12347, "id_prescricao": 3, "status": "em_progresso"},
                {"qr_code": "qr126", "hc": 12348, "id_prescricao": 4, "status": "finalizada"},
                {"qr_code": "qr127", "hc": 12349, "id_prescricao": 5, "status": "finalizada"},
                {"qr_code": "qr128", "hc": 12350, "id_prescricao": 6, "status": "pendente"},
                {"qr_code": "qr129", "hc": 12351, "id_prescricao": 7, "status": "pendente"},
                {"qr_code": "qr130", "hc": 12352, "id_prescricao": 8, "status": "pendente"},
                {"qr_code": "qr131", "hc": 12353, "id_prescricao": 9, "status": "pendente"},
                {"qr_code": "qr132", "hc": 12354, "id_prescricao": 10, "status": "pendente"}
            ]
            for fita_data in fitas:
                num_remedios = random.randint(1, 5)
                remedios_selecionados = random.sample(remedios_criados, num_remedios)
                fita = Fita(qr_code=fita_data["qr_code"], hc=fita_data["hc"], id_prescricao=fita_data["id_prescricao"], status=fita_data["status"])
                for remedio in remedios_selecionados:
                    fita.remedios.append(remedio)
                db.session.add(fita)
            db.session.flush()

            descricoes = [
                "prescrição enviada --> esperando autorização",
                "autorizar a separação --> pronto para separação",
                "separando fita --> separando",
                "remédio separado",
                "fita separada --> separada",
                "cancelamento da separação --> fita pausada",
                "fita em uso --> em uso",
                "fita devolvida (ao menos o qrcode) --> fita finalizada",
                "fita não entregue no prazo --> fita atrasada",
                "bin com lote vencido",
                "bin vazio",
                "reabastecimento do bin",
                "sem sinal de wifi",
                "desligamento (sem luz)",
                "alerta de manutenção",
                "não conseguiu ler o QRCode",
                "usuário fez login",
                "usuário fez logout",
            ]
            descricoes_criadas = []
            for descricao in descricoes:
                nova_descricao = Descricao(descricao=descricao)
                db.session.add(nova_descricao)
                descricoes_criadas.append(nova_descricao)
            db.session.flush()

            logs_criados = []
            # for paciente in pacientes_criados:
            #     for descricao in descricoes_criadas:
            #         for _ in range(random.randint(5, 15)):
            #             log = Log(
            #                 descricao_id=descricao.id,
            #                 responsavel=random.choice([True, False]),
            #                 paciente_id=paciente.id
            #             )
            #             db.session.add(log)
            #             logs_criados.append(log)
            # db.session.flush()

            def gerar_datas_iniciais(inicio, quantidade):
                return [inicio + timedelta(days=random.randint(-30, 30)) for _ in range(quantidade)]

            datas = gerar_datas_iniciais(datetime.now(timezone.utc), len(logs_criados))
            for i, log in enumerate(logs_criados):
                log.datetime = datas[i]
            db.session.flush()

            def gerar_fitas_para_data(data_registro):
                nomes_fitas = [f"Fita {i}" for i in range(1, 11)]
                descricoes_fitas = [
                    "Paciente retirou na UBS Central.",
                    "Entregue na Farmácia Popular.",
                    "Retirada na Unidade Móvel.",
                    "Entregue no Hospital Municipal.",
                    "Entregue na Farmácia Comunitária.",
                    "Retirada no Centro de Saúde.",
                    "Entregue na Unidade Básica de Saúde.",
                    "Paciente retirou na Clínica Especializada.",
                    "Entregue na UBS Bairro Novo.",
                    "Retirada na Unidade de Saúde Familiar."
                ]
                numero_fitas = random.randint(3, 10)
                fitas = []
                for i in range(numero_fitas):
                    nome_fita = random.choice(nomes_fitas)
                    descricao_fita = random.choice(descricoes_fitas)
                    fitas.append({
                        "nome": nome_fita,
                        "descricao": descricao_fita,
                        "data_registro": data_registro
                    })
                return fitas
            datas = gerar_datas_iniciais(datetime.now(timezone.utc), 60)
            for data_registro in datas:
                fitas_para_data = gerar_fitas_para_data(data_registro)
                for fita in fitas_para_data:
                    historico = Historico(
                        nome=fita["nome"],
                        descricao=fita["descricao"],
                        data_registro=fita["data_registro"]
                    )
                    db.session.add(historico)
            db.session.flush()

            db.session.commit()

            pacientes_count = Paciente.query.count()
            descricoes_count = Descricao.query.count()
            logs_count = Log.query.count()
            historicos_count = Historico.query.count()

            print(f"Pacientes: {pacientes_count}")
            print(f"Descrições: {descricoes_count}")
            print(f"Logs: {logs_count}")
            print(f"Históricos: {historicos_count}")
            print("Banco de dados populado com sucesso!")
        except Exception as e:
            db.session.rollback()
            print(f"Erro ao popular banco: {e}")
            import traceback
            traceback.print_exc()

if __name__ == "__main__":
    popular_banco()
