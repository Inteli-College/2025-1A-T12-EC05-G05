from flask import Blueprint, request
from flask_cors import cross_origin
from services.historico_service import HistoricoService

historico_blueprint = Blueprint("historico", __name__)
historicoService = HistoricoService()

@historico_blueprint.route("/historico", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_historico():
    data = request.args.get("data")  # Espera que a data venha como parâmetro na URL

    if not data:
        return {"error": "Data não fornecida"}, 400

     
