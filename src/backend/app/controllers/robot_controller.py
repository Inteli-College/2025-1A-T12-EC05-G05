from flask import Blueprint, jsonify, request
from services.robot_service import RobotService

robot_blueprint = Blueprint("robot", __name__)
robot_service = RobotService()

@robot_blueprint.route("/move", methods=["POST"])
def move_robot():
    data = request.get_json()
    try:
        # Chama a função do CLI para mover o robô
        position = data.get("position")
        add_height = data.get("add_height", 0)
        robot_service.move_to_position(position, add_height)
        return jsonify({"message": "Movimento realizado com sucesso!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    # {
    # "position": {"x": 10, "y": 15, "z": 5},
    # "add_height": 10
    # }



@robot_blueprint.route("/collect", methods=["POST"])
def collect_medication():
    data = request.get_json()
    try:
        print(data)
        # Chama a função do CLI para coletar medicamento
        bin_list = data.get("bins", [])
        robot_service.collect_medicine(bin_list)
        return jsonify({"message": "Coleta realizada com sucesso!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    # {
    # "bins": ["1", "3", "5"]
    # }
