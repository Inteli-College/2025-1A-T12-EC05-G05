from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from services.logs_service import LogsService

logs_blueprint = Blueprint("logs", __name__)
logs_service = LogsService()

@logs_blueprint.route("/logs", methods=["GET"])
@cross_origin(supports_credentials=True)
def listar_logs():
    return logs_service.listar_logs()

@logs_blueprint.route("/logs", methods=["POST"])
@cross_origin(supports_credentials=True)
def criar_log():
    descricao = request.get_json().get("descricao")
    responsavel = request.get_json().get("responsavel")
    try:
        logs_service.adicionar_log(descricao, responsavel)
        return jsonify({"message": "Log criado com sucesso!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500