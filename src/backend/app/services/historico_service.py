from flask import jsonify
from models import db, Fita  # Certifique-se de que a classe Fita está no models.py

class HistoricoService:
    def get_historico_por_data(self, data):
        fitas = Fita.query.filter(Fita.data.cast(db.String) == data).all()

        if not fitas:
            return jsonify({"message": "Nenhuma fita encontrada para essa data."}), 404

        resultado = [
            {"nome": fita.id, "descricao": fita.status}
            for fita in fitas
        ]

        return jsonify(resultado)
