import os
import random
import json
from datetime import datetime, timedelta, timezone
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

with open(os.path.join(os.path.dirname(__file__), 'initialConfig.json'), 'r') as f:
    initialConfig = json.load(f)

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
instance_path = os.path.join(basedir, "instance")
if not os.path.exists(instance_path):
    os.makedirs(instance_path)

app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{os.path.join(instance_path, 'db.sqlite')}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

CONFIG_FILE_PATH = os.path.join(os.path.dirname(__file__), 'services', 'dobot', 'config.json')
config_dir = os.path.dirname(CONFIG_FILE_PATH)
if not os.path.exists(config_dir):
    os.makedirs(config_dir)
if not os.path.exists(CONFIG_FILE_PATH):
    with open(CONFIG_FILE_PATH, 'w') as f:
        json.dump(initialConfig, f, indent=4)

class Historico(db.Model):
    __tablename__ = "historico"
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100))
    descricao = db.Column(db.String(255))
    data_registro = db.Column(db.DateTime)

class Usuario(db.Model):
    __tablename__ = "usuarios"
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(300), nullable=False)
    email = db.Column(db.String(345), unique=True, nullable=False)
    senha = db.Column(db.Text, nullable=False)

class Descricao(db.Model):
    __tablename__ = "descricoes"
    id = db.Column(db.Integer, primary_key=True)
    descricao = db.Column(db.String(500), nullable=False)

class Paciente(db.Model):
    __tablename__ = "pacientes"
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(300), nullable=False)
    leito = db.Column(db.Integer, nullable=False)
    logs = db.relationship("Log", backref="paciente", lazy=True)
    fitas = db.relationship("Fita", backref="paciente", lazy=True)

class Bin(db.Model):
    __tablename__ = "bins"
    id = db.Column(db.Integer, primary_key=True)
    id_remedio = db.Column(db.Integer, db.ForeignKey("remedios.id"), nullable=False)
    lote = db.Column(db.Integer, nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)

class FitaRemedio(db.Model):
    __tablename__ = "fita_remedio"
    id = db.Column(db.Integer, primary_key=True)
    fita_id = db.Column(db.Integer, db.ForeignKey("fitas.id"), nullable=False)
    remedio_id = db.Column(db.Integer, db.ForeignKey("remedios.id"), nullable=False)

class Fita(db.Model):
    __tablename__ = "fitas"
    id = db.Column(db.Integer, primary_key=True)
    qr_code = db.Column(db.Text, nullable=False)
    hc = db.Column(db.Integer, nullable=False)
    id_prescricao = db.Column(db.Integer, nullable=False)
    status = db.Column(db.Text, nullable=False)
    paciente_id = db.Column(db.Integer, db.ForeignKey("pacientes.id"))
    fitaremedios = db.relationship("FitaRemedio", backref="fita", lazy="joined")
    
    @property
    def remedios(self):
        return [assoc.remedio for assoc in self.fitaremedios]

class Remedio(db.Model):
    __tablename__ = "remedios"
    id = db.Column(db.Integer, primary_key=True)
    nome_do_remedio_com_gramagem = db.Column(db.String(300), nullable=False)
    qr_code = db.Column(db.Text, nullable=True)
    validade = db.Column(db.DateTime, nullable=False)
    fita_remedios = db.relationship("FitaRemedio", backref="remedio", lazy="joined")

class Log(db.Model):
    __tablename__ = "logs"
    id = db.Column(db.Integer, primary_key=True)
    datetime = db.Column(db.DateTime, default=datetime.now(timezone.utc), nullable=False)
    descricao_id = db.Column(db.Integer, db.ForeignKey("descricoes.id"), nullable=False)
    responsavel = db.Column(db.Boolean, nullable=False)
    paciente_id = db.Column(db.Integer, db.ForeignKey('pacientes.id'))
    status = db.Column(db.Integer, nullable=True)

class ConfigManager:
    def __init__(self):
        if not os.path.exists(CONFIG_FILE_PATH):
            with open(CONFIG_FILE_PATH, 'w') as f:
                json.dump(initialConfig, f, indent=4)

    def save_config(self, config):
        with open(CONFIG_FILE_PATH, 'w') as f:
            json.dump(config, f, indent=4)
        return config

    def reset_config(self):
        return self.save_config(initialConfig)

def popular_banco():
    with app.app_context():
        db.drop_all()
        db.create_all()
        try:
            Historico.query.delete()
            Log.query.delete()
            FitaRemedio.query.delete()
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
            usuarios_data = [
                {"nome": "Gabriel Henrique", "email": "gabrielhenrique@gmail.com", "senha": "123456"},
                {"nome": "Ana Carolina Lima", "email": "anacarolina@gmail.com", "senha": "987654"},
                {"nome": "Pedro Alvares", "email": "pedroalvares@gmail.com", "senha": "456789"},
                {"nome": "Juliana Mendes", "email": "julianamendes@yahoo.com", "senha": "abcdef"},
                {"nome": "Roberto Carlos", "email": "roberto.carlos@gmail.com", "senha": "123abc"},
                {"nome": "Carla Silva", "email": "carla.silva@hotmail.com", "senha": "senha123"},
                {"nome": "Marcos Oliveira", "email": "marcosoliveira@gmail.com", "senha": "m@rc0s"},
                {"nome": "Amanda Souza", "email": "amandasouza@outlook.com", "senha": "amanda22"}
            ]
            
            for u_data in usuarios_data:
                senha_hash = bcrypt.generate_password_hash(u_data["senha"]).decode("utf-8")
                usuario = Usuario(nome=u_data["nome"], email=u_data["email"], senha=senha_hash)
                db.session.add(usuario)
            db.session.flush()

            pacientes_data = [
                {"nome": "João Silva", "leito": 101},
                {"nome": "Maria Oliveira", "leito": 102},
                {"nome": "Carlos Souza", "leito": 103},
                {"nome": "Luciana Ferreira", "leito": 104},
                {"nome": "Fernanda Lima", "leito": 105},
                {"nome": "Lucas Costa", "leito": 106},
                {"nome": "Ana Santos", "leito": 107},
                {"nome": "Pedro Souza", "leito": 108},
                {"nome": "Camila Rocha", "leito": 109},
                {"nome": "Rafael Pereira", "leito": 110},
                {"nome": "Luiz Carlos Macedo", "leito": 111},
                {"nome": "Sandra Regina Oliveira", "leito": 112},
                {"nome": "Antônio Pereira da Silva", "leito": 113},
                {"nome": "Renata Almeida Costa", "leito": 114},
                {"nome": "José Roberto Ferreira", "leito": 115},
                {"nome": "Mariana Carvalho Santos", "leito": 116},
                {"nome": "Paulo Ricardo Nunes", "leito": 117},
                {"nome": "Patrícia Mendes Lima", "leito": 118},
                {"nome": "Gustavo Henrique Araujo", "leito": 119},
                {"nome": "Isabela Cristina Moraes", "leito": 120},
                {"nome": "Eduardo Teixeira Gomes", "leito": 201},
                {"nome": "Aline Cardoso Ribeiro", "leito": 202},
                {"nome": "Marcelo Augusto Prado", "leito": 203},
                {"nome": "Tatiana Freitas Correia", "leito": 204},
                {"nome": "Bruno Silva Ramos", "leito": 205}
            ]

            pacientes_criados = []
            for p in pacientes_data:
                pac = Paciente(nome=p["nome"], leito=p["leito"])
                db.session.add(pac)
                pacientes_criados.append(pac)
            db.session.flush()

            remedios_base = [
                {"nome_do_remedio_com_gramagem": "Ibuprofeno 400mg", "validade": datetime(2025, 5, 15)},
                {"nome_do_remedio_com_gramagem": "Dorflex 300mg", "validade": datetime(2025, 12, 1)},
                {"nome_do_remedio_com_gramagem": "Buscopan 10mg", "validade": datetime(2025, 10, 1)},
                {"nome_do_remedio_com_gramagem": "Dipirona 1g", "validade": datetime(2025, 7, 10)},
            ]

            num_repeticoes = 3

            remedios_data = remedios_base * num_repeticoes


            remedios_criados = []
            for r_data in remedios_data:
                qr_code = f"med_{random.randint(1000, 9999)}"
                remedio = Remedio(
                    nome_do_remedio_com_gramagem=r_data["nome_do_remedio_com_gramagem"],
                    validade=r_data["validade"],
                    qr_code=qr_code
                )
                db.session.add(remedio)
                remedios_criados.append(remedio)
            db.session.flush()


            for remedio in remedios_criados:
                for i in range(1):
                    bin = Bin(
                        id_remedio=remedio.id,
                        lote=random.randint(999, 99999),
                        quantidade=random.randint(10, 100)
                    )
                    db.session.add(bin)
                    db.session.flush()

            status_options = ["pendente", "em_progresso", "separada", "em_uso", "finalizada", "atrasada", "pausada"]
            fitas_data = [
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
            
            for i in range(15, 50):
                fitas_data.append({
                    "qr_code": f"qr{i+118}",
                    "hc": 12340 + i,
                    "id_prescricao": i + 1,
                    "status": random.choice(status_options)
                })

            fitas_criadas = []
            for f_data in fitas_data:
                pac_associado = random.choice(pacientes_criados)
                fita = Fita(qr_code=f_data["qr_code"],
                            hc=f_data["hc"],
                            id_prescricao=f_data["id_prescricao"],
                            status=f_data["status"],
                            paciente_id=pac_associado.id)
                db.session.add(fita)
                fitas_criadas.append(fita)
            db.session.flush()

            for fita in fitas_criadas:
                num_assoc = random.randint(1, 8)
                remedios_selecionados = random.sample(remedios_criados, min(num_assoc, len(remedios_criados)))
                for remedio in remedios_selecionados:
                    assoc = FitaRemedio(fita_id=fita.id, remedio_id=remedio.id)
                    db.session.add(assoc)
            db.session.flush()

            descricoes_data = [
                "prescrição enviada",
                "autorizar a separação",
                "separando fita",
                "remédio separado",
                "fita separada",
                "cancelamento da separação",
                "fita em uso",
                "fita devolvida",
                "fita não entregue no prazo",
                "bin com lote vencido",
                "bin vazio",
                "reabastecimento do bin",
                "sem sinal de wifi",
                "CSV exportado",
                "alerta de manutenção",
                "não conseguiu ler o QRCode",
                "usuário fez login",
                "usuário fez logout"
            ]
            
            descricoes_criadas = []
            for desc in descricoes_data:
                d = Descricao(descricao=desc)
                db.session.add(d)
                descricoes_criadas.append(d)
            db.session.flush()

            now = datetime.now(timezone.utc)
            for paciente in pacientes_criados:
                for _ in range(random.randint(1, 5)):
                    log_date = now - timedelta(hours=random.randint(1, 100))
                    log = Log(
                        datetime=log_date,
                        descricao_id=random.choice(descricoes_criadas).id,
                        responsavel=random.choice([True, False]),
                        paciente_id=paciente.id
                    )
                    db.session.add(log)
            db.session.flush()

            for i in range(30):
                historico_date = now - timedelta(days=random.randint(1, 45))
                evento = random.choice([
                    "Manutenção do Sistema",
                    "Atualização de Software",
                    "Reabastecimento Completo",
                    "Verificação de Inventário",
                    "Relatório Diário",
                    "Problema Técnico Resolvido",
                    "Falha na Leitura de QR",
                    "Alerta de Estoque Baixo"
                ])
                detalhes = random.choice(["Concluído", "Em Progresso"])
                historico = Historico(
                    nome=evento,
                    descricao=f"{evento}: {detalhes}",
                    data_registro=historico_date
                )
                db.session.add(historico)

            db.session.flush()

            # ✅ Fita de teste com 3 remédios para devolução
            fita_teste = Fita(
                qr_code="FITA-DEV123",
                hc=9999,
                id_prescricao=999,
                status="entregue",
                paciente_id=pacientes_criados[0].id
            )
            db.session.add(fita_teste)
            db.session.flush()

            remedios_de_teste = [
                Remedio(nome_do_remedio_com_gramagem="Amoxicilina 500mg", qr_code="QR-AMOX-500", validade=datetime(2026, 5, 10)),
                Remedio(nome_do_remedio_com_gramagem="Losartana 50mg", qr_code="QR-LOS-50", validade=datetime(2026, 8, 20)),
                Remedio(nome_do_remedio_com_gramagem="Omeprazol 20mg", qr_code="QR-OME-20", validade=datetime(2026, 7, 5))
            ]
            for r in remedios_de_teste:
                db.session.add(r)
            db.session.flush()

            for r in remedios_de_teste:
                assoc = FitaRemedio(fita_id=fita_teste.id, remedio_id=r.id)
                db.session.add(assoc)

            db.session.commit()
            print(f"Usuários: {Usuario.query.count()}")
            print(f"Pacientes: {Paciente.query.count()}")
            print(f"Fitas: {Fita.query.count()}")
            print(f"Bins: {Bin.query.count()}")
            print(f"Logs: {Log.query.count()}")
            print(f"Históricos: {Historico.query.count()}")
            print(f"Remédios (associações): {FitaRemedio.query.count()}")
            print("✅ Banco de dados populado com sucesso!")

        except Exception as e:
            db.session.rollback()
            print(f"❌ Erro ao popular banco: {e}")
            import traceback
            traceback.print_exc()

if __name__ == "__main__":
    config_manager = ConfigManager()
    config_manager.reset_config()
    popular_banco()