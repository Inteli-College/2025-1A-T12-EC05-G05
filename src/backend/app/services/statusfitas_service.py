from models import db, Fita, Remedio, Paciente
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
            "remedios": [
                remedio.nome_do_remedio_com_gramagem 
                for remedio in f.remedios
            ]
        } for f in fitas])

    def obter_fita(self, fita_id:int):
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

        # Mapeamento de status
        status_mapeamento = {
            "pendente": "Pendente",
            "em_progresso": "Em Progresso", 
            "finalizada": "Finalizada"
        }

        # Criar a lista de medicamentos corretamente
        remedios_popup = []  # Certifique-se de que começa como uma lista vazia
        for remedio in fita.remedios:
            remedios_popup.append({
                "nome": remedio.nome_do_remedio_com_gramagem,
                "tipo": "Comprimido",  # Mock - adicionar lógica se necessário
                "validade": remedio.validade.strftime('%d/%m/%Y'),
                "status": "Em estoque" if random.random() > 0.3 else "Em falta",  # Mock status
                "quantidade": random.randint(1, 3)  # Mock quantidade
            })

        return jsonify({
            "id": fita.id,
            "nome": f"Fita {fita.id}",
            "status": status_mapeamento.get(fita.status, fita.status),  # Alterado de "estado" para "status"
            "paciente": paciente_info['nome'] if paciente_info else "Paciente não identificado",
            "leito": paciente_info['leito'] if paciente_info else "Leito não definido",
            "ultimaAtualizacao": datetime.now().strftime('%d/%m/%Y - %H:%M'),
            "aprovadoPor": "Maria Souza",  # Mock
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