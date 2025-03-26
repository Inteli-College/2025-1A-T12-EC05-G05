from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from services.historico_service import HistoricoService

historico_blueprint = Blueprint("historico", __name__)
historicoService = HistoricoService()

@historico_blueprint.route("/historico", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_historico():
    data = request.args.get("data")  # Espera que a data venha como parâmetro na URL

    if not data:
        return jsonify({"error": "Data não fornecida"}), 400  # Retorno de erro 400 se a data não for fornecida

    # Chama o método do serviço para obter o histórico com base na data
    resultado = historicoService.get_historico_por_data(data)

    if resultado:
        return resultado  # Retorna os dados encontrados
    else:
        return jsonify({"message": "Nenhuma fita encontrada para essa data."}), 404  # Retorna erro 404 caso nenhum resultado seja encontrado
