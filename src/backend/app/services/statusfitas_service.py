from models import db, Fita, Medicamento
from flask import jsonify

class FitaService:

    def listar_todas(self):
        fitas = Fita.query.all()
        return jsonify([{"id": f.id, "nome": f.nome, "status": f.status} for f in fitas])

    def obter_fita(self, fita_id):
        fita = Fita.query.get(fita_id)
        if not fita:
            return jsonify({"error": "Fita não encontrada"}), 404
        medicamentos = Medicamento.query.filter_by(fita_id=fita_id).all()

        return jsonify({
            "id": fita.id,
            "nome": fita.nome,
            "status": fita.status,
            "medicamentos": [{"id": m.id, "nome": m.nome, "lote": m.lote, "validade": m.validade} for m in medicamentos]
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
            db.session.rollback()  # Em caso de erro, reverte a transação
            return jsonify({"error": str(e)}), 500
        
    def criar_fita(self, dados):
        try:
            nova_fita = Fita(
                nome=dados.get("nome"),
                status=dados.get("status", "pendente")
            )
            db.session.add(nova_fita)
            db.session.commit()

            # Criar medicamentos relacionados, se houver
            medicamentos = dados.get("medicamentos", [])
            for med in medicamentos:
                novo_medicamento = Medicamento(
                    nome=med["nome"],
                    lote=med["lote"],
                    validade=med["validade"],
                    fita_id=nova_fita.id
                )
                db.session.add(novo_medicamento)

            db.session.commit()
            return jsonify({"message": "Fita criada com sucesso", "id": nova_fita.id}), 201 
        except Exception as e:
            db.session.rollback()  # Reverter qualquer alteração em caso de erro
            return jsonify({"error": str(e)}), 500