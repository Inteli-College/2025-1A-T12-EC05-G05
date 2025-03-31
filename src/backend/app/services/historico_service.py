from flask import jsonify
from models import db, Historico

class HistoricoService:
    def listar_historico(self, data):
        if not data:
            return jsonify({"error": "Data não fornecida"}), 400

        historico = Historico.query.filter_by(data=data).all()

        resultado = [
            {"nome": h.id, "descricao": h.status}
            for h in historico
        ]

        return jsonify(resultado)
