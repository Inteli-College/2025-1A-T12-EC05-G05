from datetime import datetime
from models import db, Fita, Usuario, Descricao

def popular_banco():
    with db.session.begin():
        # Criando Usuário se não existir
        usuario_existente = Usuario.query.filter_by(email="gabrielhenrique@gmail.com").first()
        if not usuario_existente:
            usuario = Usuario(
                nome="Gabriel Henrique", 
                email="gabrielhenrique@gmail.com", 
                senha="123456"  # Adicione a senha criptografada se necessário
            )
            db.session.add(usuario)

        # Criando Descrições se não existirem
        if not Descricao.query.first():
            descricoes = [
                "prescrição enviada --> esperando autorização",
                "autorizar a separação --> pronto para separação",
                "separando fita --> separando",
                "remédio separado",
                "fita separada --> separada",
                "cancelamento da separação --> fita pausada",
                "fita em uso --> em uso",
                "fita devolvida(ao menos o qrcode) --> fita finalizada",
                "fita não entregue no prazo --> fita atrasada",
                "bin com lote vencido",
                "bin vazio",
                "reabastecimento do bin",
                "sem sinal de wifi",
                "desligamento (sem luz)",
                "alerta de manutenção",
                "não conseguiu ler o QRCode"
            ]
            for descricao in descricoes:
                nova_descricao = Descricao(descricao=descricao)
                db.session.add(nova_descricao)

        # Criando Fitas com datas de exemplo
        if not Fita.query.first():
            fitas = [
                {"qr_code": "qr123", "hc": 12345, "id_prescricao": 1, "status": "prescrição enviada", "data": datetime(2025, 3, 26, 10, 30)},
                {"qr_code": "qr124", "hc": 12346, "id_prescricao": 2, "status": "separando fita", "data": datetime(2025, 3, 26, 11, 00)},
                {"qr_code": "qr125", "hc": 12347, "id_prescricao": 3, "status": "remédio separado", "data": datetime(2025, 3, 26, 11, 30)}
            ]
            for fita_data in fitas:
                fita = Fita(
                    qr_code=fita_data["qr_code"], 
                    hc=fita_data["hc"], 
                    id_prescricao=fita_data["id_prescricao"], 
                    status=fita_data["status"], 
                    data=fita_data["data"]
                )
                db.session.add(fita)

        db.session.commit()

        print("Banco de dados populado com sucesso!")

