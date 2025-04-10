from models import db, Fita, Remedio, Paciente, FitaRemedio
from flask import jsonify
import random
from datetime import datetime

class FitaService:
    def listar_todas(self):
        fitas = Fita.query.all()
        return jsonify([{
            "id": f.id,
            "status": f.status,
            "hc": f.hc,
            "remedios": [r.nome_do_remedio_com_gramagem for r in f.remedios]
        } for f in fitas])
    
    def obter_fita(self, fita_id: int):
        fita = Fita.query.get(fita_id)
        if not fita:
            return jsonify({"error": "Fita não encontrada"}), 404
        paciente_info = None
        if fita.paciente:
            paciente_info = {
                "id": fita.paciente.id,
                "nome": fita.paciente.nome,
                "leito": fita.paciente.leito
            }
        status_mapeamento = {
            "pendente": "Pendente",
            "em_progresso": "Em Progresso",
            "finalizada": "Finalizada"
        }
        remedios_popup = []
        for remedio in fita.remedios:
            remedios_popup.append({
                "nome": remedio.nome_do_remedio_com_gramagem,
                "tipo": "Comprimido", 
                "validade": remedio.validade.strftime('%d/%m/%Y'),
                "status": "Em estoque" if random.random() > 0.3 else "Em falta",
                "quantidade": random.randint(1, 3)
            })
        return jsonify({
            "id": fita.id,
            "nome": f"Fita {fita.id}",
            "status": status_mapeamento.get(fita.status, fita.status),
            "QrCode": fita.qr_code ,
            "paciente": paciente_info["nome"] if paciente_info else "Paciente não identificado",
            "leito": paciente_info["leito"] if paciente_info else "Leito não definido",
            "ultimaAtualizacao": datetime.now().strftime('%d/%m/%Y - %H:%M'),
            "aprovadoPor": "Maria Souza",
            "medicamentos": remedios_popup
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
    
    def registrar_qrcode(self, fita_id, qr_code):
        fita = Fita.query.get(fita_id)

        if not fita:
            return jsonify({"error": "Fita não encontrada"}), 404

        fita.qr_code = qr_code

        try:
            db.session.commit()
            return jsonify({
                "message": "QR Code registrado com sucesso!",
                "fita_id": fita.id,
                "qr_code": fita.qr_code
            }), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": f"Erro ao registrar QR Code: {str(e)}"}), 500


    def criar_fita(self, dados):
        try:
            nova_fita = Fita(
                qr_code=dados.get("qr_code"),
                status=dados.get("status", "pendente"),
                hc=dados.get("hc"),
                id_prescricao=dados.get("id_prescricao"),
                paciente_id=dados.get("paciente_id")
            )
            db.session.add(nova_fita)
            db.session.commit()
            remedios = dados.get("remedios", [])
            for med in remedios:
                remedio_existente = None
                if isinstance(med, int):
                    remedio_existente = Remedio.query.get(med)
                else:
                    remedio_existente = Remedio.query.filter_by(nome_do_remedio_com_gramagem=med.get("nome")).first()
                if remedio_existente:
                    assoc = FitaRemedio(fita_id=nova_fita.id, remedio_id=remedio_existente.id)
                    db.session.add(assoc)
            db.session.commit()
            return jsonify({"message": "Fita criada com sucesso", "id": nova_fita.id}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 500
