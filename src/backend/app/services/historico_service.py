from flask import jsonify
from models import db, Fita

class HistoricoService:
    def get_historico_por_data(self, data):
        fitas = Fita.query.filter(Fita.data.cast(db.String) == data).all()

        if not fitas:
            return None

        resultado = [
            {"nome": fita.id, "descricao": fita.status}
            for fita in fitas
        ]

        return jsonify(resultado)
