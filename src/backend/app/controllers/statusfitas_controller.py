from flask import Blueprint, request
from flask_cors import cross_origin
from services.statusfitas_service import FitaService

fita_service = FitaService()
fita_blueprint = Blueprint("fita", __name__)

@fita_blueprint.route("/fitas", methods=["GET"])
@cross_origin()
def listar_fitas():
    return fita_service.listar_todas()

@fita_blueprint.route("/fitas/<fita_id>", methods=["GET"])
@cross_origin()
def obter_fita(fita_id):
    return fita_service.obter_fita(fita_id)

@fita_blueprint.route("/fitas/<fita_id>", methods=["PATCH"])
@cross_origin()
def atualizar_fita(fita_id):
    return fita_service.atualiza_status(fita_id, request.get_json())

#Rota feitra para enviar dados
@fita_blueprint.route("/fitas", methods=["POST"])
@cross_origin()
def criar_fita():
    dados = request.get_json()
    return fita_service.criar_fita(dados)
