from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from services.logs_service import LogsService

logs_blueprint = Blueprint("logs", __name__)
logs_service = LogsService()

@logs_blueprint.route("/logs", methods=["GET"])
@cross_origin(supports_credentials=True)
def listar_logs():
    return logs_service.listar_logs()
