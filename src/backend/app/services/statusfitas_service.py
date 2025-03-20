from models import db, Fita, Remedio
from flask import jsonify

class FitaService:

    def listar_todas(self):
        fitas = Fita.query.all()
        return jsonify([{"id": f.id, "qr_code": f.qr_code, "status": f.status} for f in fitas])

    def obter_fita(self, fita_id):
        fita = Fita.query.get(fita_id)
        if not fita:
            return jsonify({"error": "Fita não encontrada"}), 404
        
        remedios = Remedio.query.filter_by(fita_id=fita_id).all()

        return jsonify({
            "id": fita.id,
            "qr_code": fita.qr_code,
            "status": fita.status,
            "remedios": [{"id": r.id, "nome": r.nome_do_remedio_com_gramagem, "validade": r.validade} for r in remedios]
        })

    def atualiza_status(self, fita_id, req):
        fita = Fita.query.get(fita_id)
        if not fita:
            return jsonify({"error": "Fita não encontrada"}), 404
        fita.status = req.get("status", fita.status)

        try:
            db.session.commit()
            return jsonify({"message": "Status da fita atualizado com sucesso"})
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 500
        
    def criar_fita(self, dados):
        try:
            nova_fita = Fita(
                qr_code=dados.get("qr_code"),
                status=dados.get("status", "pendente"),
                hc=dados.get("hc"),
                id_prescricao=dados.get("id_prescricao")
            )
            db.session.add(nova_fita)
            db.session.commit()

            remedios = dados.get("remedios", [])
            for med in remedios:
                novo_remedio = Remedio(
                    nome_do_remedio_com_gramagem=med["nome_do_remedio_com_gramagem"],
                    validade=med["validade"],
                    fita_id=nova_fita.id
                )
                db.session.add(novo_remedio)

            db.session.commit()
            return jsonify({"message": "Fita criada com sucesso", "id": nova_fita.id}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 500
