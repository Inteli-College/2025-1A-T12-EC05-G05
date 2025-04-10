from flask import Blueprint, request
from flask_cors import cross_origin
from services.devolucao_Service import DevolucaoService

devolucao_service = DevolucaoService()
devolucao_blueprint = Blueprint("devolucao", __name__)

@devolucao_blueprint.route("/fitas-possiveis-devolucao", methods=["GET"])
@cross_origin(supports_credentials=True)
def listar_possiveis_devolucoes():
    return devolucao_service.listar_possiveis_devolucoes()

@devolucao_blueprint.route("/fitas-devolvidas", methods=["GET"])
@cross_origin(supports_credentials=True)
def listar_devolvidas():
    return devolucao_service.listar_devolvidas()

@devolucao_blueprint.route("/devolver-fita/<int:fita_id>", methods=["PATCH"])
@cross_origin(supports_credentials=True)
def devolver_fita(fita_id):
    return devolucao_service.devolver_fita(fita_id)
