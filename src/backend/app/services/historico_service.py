from flask import jsonify
from models import db, Historico
from sqlalchemy import func
from collections import defaultdict

class HistoricoService:
    def listar_historico(self):
        historicos = Historico.query.order_by(Historico.data_registro).all()
        
        resultado = defaultdict(list)
        
        for h in historicos:
            data_formatada = h.data_registro.strftime("%Y-%m-%d")
            registro = {
                "nome": h.nome, 
                "descricao": h.descricao
            }
            resultado[data_formatada].append(registro)
        
        return jsonify(dict(resultado))