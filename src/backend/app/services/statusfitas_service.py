from models import db, Fita, Remedio, Paciente
from flask import jsonify

class FitaService:
    def listar_todas(self):
        fitas = Fita.query.all()
        return jsonify([{
            "id": f.id,
            "status": f.status,
            "hc": f.hc,
            "remedios": [
                remedio.nome_do_remedio_com_gramagem 
                for remedio in f.remedios
            ]
        } for f in fitas])

    def obter_fita(self, fita_id):
        fita = Fita.query.get(fita_id)
        if not fita:
            return jsonify({"error": "Fita não encontrada"}), 404

        # Validar a existência do paciente
        paciente_info = None
        if fita.paciente:
            paciente_info = {
                "id": fita.paciente.id,
                "nome": fita.paciente.nome,
                "leito": fita.paciente.leito
            }

        # Retornar detalhes da fita, paciente e remédios
        return jsonify({
            "id": fita.id,
            "status": fita.status,
            "hc": fita.hc,
            "paciente": paciente_info,
            "remedios": [
                {
                    "id": remedio.id,
                    "nome": remedio.nome_do_remedio_com_gramagem,
                    "validade": remedio.validade.strftime('%Y-%m-%d')
                }
                for remedio in fita.remedios
            ]
        }), 200

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
            # Criar uma nova fita com os dados fornecidos
            nova_fita = Fita(
                qr_code=dados.get("qr_code"),
                status=dados.get("status", "pendente"),
                hc=dados.get("hc"),
                id_prescricao=dados.get("id_prescricao")
            )
            db.session.add(nova_fita)
            db.session.commit()

            # Criar os remédios relacionados, se houver
            remedios = dados.get("remedios", [])
            for med in remedios:
                remedio_existente = Remedio.query.filter_by(nome_do_remedio_com_gramagem=med.get("nome_do_remedio_com_gramagem")).first()

                # Se o remédio não existir, criar um novo
                if not remedio_existente:
                    remedio_existente = Remedio(
                        nome_do_remedio_com_gramagem=med.get("nome_do_remedio_com_gramagem"),
                        validade=med.get("validade")
                    )
                    db.session.add(remedio_existente)

                # Associar o remédio à fita
                nova_fita.remedios.append(remedio_existente)

            db.session.commit()
            return jsonify({"message": "Fita criada com sucesso", "id": nova_fita.id}), 201

        except Exception as e:
            db.session.rollback()  # Reverter alterações em caso de erro
            return jsonify({"error": str(e)}), 500