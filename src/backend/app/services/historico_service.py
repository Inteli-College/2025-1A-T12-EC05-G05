from flask import jsonify
from models import db, Historico
from sqlalchemy import func
from collections import defaultdict

class HistoricoService:
    def listar_historico(self):
        # Query all historical records ordered by date
        historicos = Historico.query.order_by(Historico.data_registro).all()
        
        # Use defaultdict to organize records by date
        resultado = defaultdict(list)
        
        # Group records by date
        for h in historicos:
            data_formatada = h.data_registro.strftime("%Y-%m-%d")
            registro = {
                "nome": h.nome, 
                "descricao": h.descricao
            }
            resultado[data_formatada].append(registro)
        
        # Convert defaultdict to regular dict for JSON serialization
        return jsonify(dict(resultado))