from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from services.historico_service import HistoricoService

historico_blueprint = Blueprint("historico", __name__)
historico_service = HistoricoService()

@historico_blueprint.route("/historico", methods=["GET"])
@cross_origin(supports_credentials=True)
def listar_historico():
    return historico_service.listar_historico()
