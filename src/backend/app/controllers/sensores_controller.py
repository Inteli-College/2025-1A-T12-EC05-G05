from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from services.sensors_service import SensorsService

sensors_blueprint = Blueprint("sensors", __name__)
sensors_service = SensorsService()

@sensors_blueprint.route("/sensores", methods=["POST"])
@cross_origin(supports_credentials=True)
def update_status_catch():
    try:
        status = request.get_json().get("status")
        if status not in ["ALTO", "BAIXO"]:
            return jsonify({"error": "Status inválido! O status deve ser 'ALTO' ou 'BAIXO'."}), 400
        
        sensors_service.new_status_catch(status)
        return jsonify({"message": "Status atualizado com sucesso!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@sensors_blueprint.route("/sensores", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_status_catch():
    try:
        status = sensors_service.get_status()
        if status is None:
            return jsonify({"error": "Status não encontrado!"}), 404
        return jsonify({"caught": status}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
