from flask import Blueprint, request
from flask_cors import cross_origin
from services.statusfitas_service import FitaService

fita_service = FitaService()
fita_blueprint = Blueprint("fita", __name__)

@fita_blueprint.route("/fitas", methods=["GET"])
@cross_origin(supports_credentials=True)
def listar_fitas():
    return fita_service.listar_todas()

@fita_blueprint.route("/fitas/<fita_id>", methods=["GET"])
@cross_origin(supports_credentials=True)
def obter_fita(fita_id):
    return fita_service.obter_fita(fita_id)

@fita_blueprint.route("/fitas/<fita_id>", methods=["PATCH"])
@cross_origin(supports_credentials=True)
def atualizar_fita(fita_id):
    return fita_service.atualiza_status(fita_id, request.get_json())

#Rota feitra para enviar dados
@fita_blueprint.route("/fitas", methods=["POST"])
@cross_origin(supports_credentials=True)
def criar_fita():
    dados = request.get_json()
    return fita_service.criar_fita(dados)

@fita_blueprint.route("/fitas/<int:fita_id>/registrarqr", methods=["PATCH"])
@cross_origin(supports_credentials=True)
def registrar_qrcode_fita(fita_id):
    dados = request.get_json()
    qr_code = dados.get("qr_code")

    if not qr_code:
        return jsonify({"error": "qr_code não fornecido"}), 400

    return fita_service.registrar_qrcode(fita_id, qr_code)

