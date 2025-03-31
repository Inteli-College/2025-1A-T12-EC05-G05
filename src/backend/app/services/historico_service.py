from flask import jsonify
from models import db, Fita, FitaRemedio, Remedio

class HistoricoService:
    def get_historico(self):
        fitas = Fita.query.all()

        if not fitas:
            return None

        resultado = []
        for fita in fitas:
            # Buscar os remédios associados diretamente através da relação definida no modelo
            remedios = [r.nome_do_remedio_com_gramagem for r in fita.remedios]

            resultado.append({
                "data": fita.data.strftime("%Y-%m-%d"),
                "nome": fita.id,
                "descricao": fita.status,
                "medicamentos": remedios  
            })

        return jsonify(resultado)