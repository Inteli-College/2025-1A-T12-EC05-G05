from flask import jsonify
from models import db, Fita

class HistoricoService:
    def get_historico(self):
        fitas = Fita.query.all()

        if not fitas:
            return None

        resultado = [
            {
                "data": fita.data.strftime("%Y-%m-%d"),  # Pegando apenas a data no formato YYYY-MM-DD
                "nome": fita.id,
                "descricao": fita.status
            }
            for fita in fitas
        ]

        return jsonify(resultado)
