from flask import Blueprint, request, jsonify

qrcode_blueprint = Blueprint("qrcode_blueprint", __name__)

# Variável global para armazenar temporariamente o QR Code
last_qr_code = None

@qrcode_blueprint.route("/qrcode-response", methods=["POST"])
def receber_qrcode():
    global last_qr_code
    data = request.get_json()
    last_qr_code = data
    return jsonify({"status": "QR code recebido"}), 200

@qrcode_blueprint.route("/qrcode-response", methods=["GET"])
def retornar_qrcode():
    if last_qr_code:
        return jsonify(last_qr_code), 200
    return jsonify({"erro": "Nenhum QR code recebido ainda."}), 404
