from flask import jsonify
from models import db, Fita, Log, Descricao
from datetime import datetime, timezone
from flask import request

class DevolucaoService:
    def listar_possiveis_devolucoes(self):
        fitas = Fita.query.filter(Fita.status == "em_uso").all()
        return jsonify([
            {
                "id": fita.id,
                "nome": f"Fita {fita.id}",
                "remedios": [r.nome_do_remedio_com_gramagem for r in fita.remedios],
                "status" : fita.status
            } for fita in fitas
        ])

    def listar_devolvidas(self):
        fitas = Fita.query.filter(Fita.status == "finalizada").all()
        return jsonify([
            {
                "id": fita.id,
                "nome": f"Fita {fita.id}",
                "remedios": [r.nome_do_remedio_com_gramagem for r in fita.remedios],
                "status" : fita.status
            } for fita in fitas
        ])

    def devolver_fita(self, fita_id):

        fita = Fita.query.get(fita_id)
        if not fita:
            return jsonify({"error": "Fita não encontrada"}), 404

        dados = request.get_json()
        remedios_devolvidos = dados.get("remedios_devolvidos", [])

        remedios_originais = [r.nome_do_remedio_com_gramagem for r in fita.remedios]

        usados = list(set(remedios_originais) - set(remedios_devolvidos))
        devolvidos_confirmados = list(set(remedios_devolvidos) & set(remedios_originais))
        sobrando = list(set(remedios_devolvidos) - set(remedios_originais))  # opcional

        fita.status = "finalizada"
        fita.qr_code = ""

        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": "Erro ao atualizar fita: " + str(e)}), 500

        try:
            descricao = Descricao.query.filter(Descricao.descricao.ilike("%devolução%")).first()

            log = Log(
                datetime=datetime.now(timezone.utc),
                descricao_id=descricao.id if descricao else 1,
                responsavel=True,
                paciente_id=fita.paciente_id,
                status=None
            )
            db.session.add(log)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": "Erro ao registrar log: " + str(e)}), 500

        return jsonify({
            "message": "Fita devolvida com sucesso!",
            "fita_id": fita.id,
               "status" : fita.status,
            "remedios_esperados": remedios_originais,
            "remedios_devolvidos": remedios_devolvidos,
            "remedios_usados": usados,
            "sobrando": sobrando
        })
