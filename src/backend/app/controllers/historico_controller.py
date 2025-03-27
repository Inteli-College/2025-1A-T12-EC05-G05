from flask import Blueprint, jsonify
from flask_cors import cross_origin
from services.historico_service import HistoricoService

historico_blueprint = Blueprint("historico", __name__)
historicoService = HistoricoService()

@historico_blueprint.route("/historico", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_historico():
    resultado = historicoService.get_historico()

    if resultado:
        return resultado
    else:
        return jsonify({"message": "Nenhuma fita encontrada."}), 404

