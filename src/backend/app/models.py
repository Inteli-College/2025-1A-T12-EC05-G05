from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from datetime import datetime, timezone
import os
from datetime import datetime, timedelta, timezone
import random


app = Flask(__name__)

# Caminho absoluto para o banco de dados
basedir = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{os.path.join(basedir, '.', 'instance', 'db.sqlite')}"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)



class Historico(db.Model):
    __tablename__ = 'historico'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100))
    descricao = db.Column(db.String(255))
    data_registro = db.Column(db.DateTime)

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


def popular_banco():
    with app.app_context():
        db.create_all()

        try:
            # Limpar todas as tabelas antes de popular novamente
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
            # Criando Usuário
            senha_hash = bcrypt.generate_password_hash("123456").decode('utf-8')
            usuario = Usuario(nome="Gabriel Henrique", email="gabrielhenrique@gmail.com", senha=senha_hash)
            db.session.add(usuario)
            db.session.flush()  # Garante que o ID seja gerado sem fazer commit
            
            # Criando Pacientes de exemplo
            pacientes_criados = []
            pacientes = [
                {"nome": "João Silva", "leito": 101},
                {"nome": "Maria Oliveira", "leito": 102},
                {"nome": "Carlos Souza", "leito": 103},
                {"nome": "Luciana Ferreira", "leito": 104}
            ]
            for paciente_data in pacientes:
                paciente = Paciente(nome=paciente_data["nome"], leito=paciente_data["leito"])
                db.session.add(paciente)
                pacientes_criados.append(paciente)
            db.session.flush()  # Apenas flush para obter IDs
            
            # Criando Remédios de exemplo
            remedios = [
                {"nome_do_remedio_com_gramagem": "Paracetamol 500mg", "validade": datetime(2025, 5, 15)},
                {"nome_do_remedio_com_gramagem": "Amoxicilina 250mg", "validade": datetime(2025, 12, 1)},
                {"nome_do_remedio_com_gramagem": "Ibuprofeno 200mg", "validade": datetime(2025, 10, 1)}
            ]
            remedios_criados = []
            for remedio_data in remedios:
                remedio = Remedio(nome_do_remedio_com_gramagem=remedio_data["nome_do_remedio_com_gramagem"],
                                validade=remedio_data["validade"])
                db.session.add(remedio)
                remedios_criados.append(remedio)
            db.session.flush()
            
            # Criando Bins de exemplo
            for i, remedio in enumerate(remedios_criados):
                bin = Bin(
                    id_remedio=remedio.id, 
                    localizacao=45.123 + i*0.001, 
                    quantidade=50 + i*50
                )
                db.session.add(bin)
            db.session.flush()
            
            # Criando Fitas de exemplo
            fitas = [
                {"qr_code": "qr123", "hc": 12345, "id_prescricao": 1, "status": "prescrição enviada"},
                {"qr_code": "qr124", "hc": 12346, "id_prescricao": 2, "status": "separando fita"},
                {"qr_code": "qr125", "hc": 12347, "id_prescricao": 3, "status": "remédio separado"}
            ]
            for fita_data in fitas:
                fita = Fita(qr_code=fita_data["qr_code"], hc=fita_data["hc"], id_prescricao=fita_data["id_prescricao"], status=fita_data["status"])
                db.session.add(fita)
            db.session.flush()
            
            # Criando Descrições e armazenando suas referências
            descricoes_criadas = []
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
                descricoes_criadas.append(nova_descricao)
            db.session.flush() 

            def gerar_datas_iniciais(inicio, quantidade):
                return [inicio - timedelta(days=i) for i in range(quantidade)]

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

                
            # Finalmente, commit de todas as alterações
            db.session.commit()
            
            # Verificação das tabelas após o commit
            pacientes_count = Paciente.query.count()
            descricoes_count = Descricao.query.count()
            logs_count = Log.query.count()
            historicos_count = Historico.query.count()
            
            print(f"Pacientes: {pacientes_count}")
            print(f"Descrições: {descricoes_count}")
            print(f"Logs: {logs_count}")
            print(f"Históricos: {historicos_count}")
            
            if logs_count == 0:
                print("ATENÇÃO: Nenhum registro criado na tabela Logs!")
            if historicos_count == 0:
                print("ATENÇÃO: Nenhum registro criado na tabela Histórico!")
                
            print("Banco de dados populado com sucesso!")
            
        except Exception as e:
            db.session.rollback()
            print(f"Erro ao popular banco: {e}")
            import traceback
            traceback.print_exc()

# Rodar as funções
if __name__ == "__main__":
    popular_banco()
