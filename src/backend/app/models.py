from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text, nullable=False)
class Fita(db.Model):
    __tablename__ = "fitas"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    nome = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(50), nullable=False, default="pendente")  #pendente, fazendo, finalizado

class Medicamento(db.Model):
    __tablename__ = "medicamentos"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    nome = db.Column(db.String(150), nullable=False)
    lote = db.Column(db.String(100), nullable=False)
    validade = db.Column(db.String(12), nullable=False)
    fita_id = db.Column(db.String(32), db.ForeignKey("fitas.id"), nullable=False)