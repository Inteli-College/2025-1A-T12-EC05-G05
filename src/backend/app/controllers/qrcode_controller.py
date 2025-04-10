from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from models import Fita, Remedio  # <- adiciona isso aqui!

qrcode_blueprint = Blueprint("qrcode_blueprint", __name__)

# Variável global para armazenar temporariamente o QR Code
last_qr_code = None

@qrcode_blueprint.route("/qrcode-response", methods=["POST"])
@cross_origin(supports_credentials=True)
def receber_qrcode():
    global last_qr_code
    data = request.get_json()
    last_qr_code = data
    return jsonify({"status": "QR code recebido"}), 200

@qrcode_blueprint.route("/qrcode-response", methods=["GET"])
@cross_origin(supports_credentials=True)
def retornar_qrcode():
    if last_qr_code:
        return jsonify(last_qr_code), 200
    return jsonify({"erro": "Nenhum QR code recebido ainda."}), 404


@qrcode_blueprint.route("/qrcode-response/classificar", methods=["GET"])
@cross_origin(supports_credentials=True)
def classificar_qrcode():
    global last_qr_code
    if not last_qr_code or "qr_code" not in last_qr_code:
        return jsonify({"erro": "Nenhum QR code válido disponível"}), 400

    qr = last_qr_code["qr_code"]

    fita = Fita.query.filter_by(qr_code=qr).first()
    if fita:
        return jsonify({"tipo": "fita", "id": fita.id, "qr_code": qr}), 200

    remedio = Remedio.query.filter_by(qr_code=qr).first()
    if remedio:
        return jsonify({
            "tipo": "remedio",
            #"lote": lote.id,
            "nome": remedio.nome_do_remedio_com_gramagem,
            "validade": remedio.validade.strftime('%d/%m/%Y')
        }), 200

    return jsonify({"tipo": "desconhecido", "qr_code": qr}), 404
