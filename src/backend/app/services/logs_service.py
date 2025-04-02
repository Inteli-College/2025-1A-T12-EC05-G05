from models import db, Log, Descricao
from flask import jsonify
from datetime import datetime, timezone
import random

class LogsService:
    def listar_logs(self):
        try:
            logs = Log.query.order_by(Log.datetime.desc()).all()

            logs_list = []
            status_options = [
                "Concluído", 
                "Em progresso", 
                "A fazer", 
                "Ocupado", 
                "Pausado", 
                "Cancelado", 
                "Em análise"
            ]

            for log in logs:
                descricao = Descricao.query.get(log.descricao_id)
                log_data = {
                    "nome": f"Fita {log.id}",
                    "descricao": descricao.descricao if descricao else "Descrição não encontrada",
                    "tipo": "Ações do Robô" if log.responsavel else "Ações do Usuário",
                    "status": random.choice(status_options),
                    "data": log.datetime.strftime('%d/%m/%Y %H:%M')
                }
                logs_list.append(log_data)

            return jsonify({"logs": logs_list}), 200

        except Exception as e:
            return jsonify({"error": f"Erro ao listar logs: {str(e)}"}), 500

    def adicionar_log(self, descricao_id, responsavel):
        try:
            responsavel = True if responsavel == '1' else False if responsavel == '0' else bool(responsavel)

            novo_log = Log(datetime=datetime.now(timezone.utc), descricao_id=descricao_id, responsavel=responsavel)
            db.session.add(novo_log)
            db.session.commit()
            return jsonify({"message": "Log adicionado com sucesso!"}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": f"Erro ao adicionar log: {str(e)}"}), 500

