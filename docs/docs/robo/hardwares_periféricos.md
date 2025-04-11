---
title: "🖲️ Hardwares Periféricos"
sidebar_label: "Hardwares Periféricos"
---

## 🔍 O que é?

&emsp; Hardware periférico é um dispositivo que se conecta ao hardware principal de um computador ou dispositivo móvel para fornecer funcionalidades adicionais. No nosso projeto, vamos utilizar o leitor de Qr code e o sensor infravermelho usando um Raspberry Pi 5 (micro computador) para fazer a integração no nosso sistema.

## 🏷️ Leitor de QR code

&emsp; No nosso projeto, o leitor de QR code é utilizado para registrar as informações dos medicamentos que estão sendo separados para a produção das fitas. Esses dados incluem nome do medicamento, quantidade, validade e lote. Durante a operação, o braço robótico se posiciona acima do bin, realiza a leitura do QR code e, em seguida, continua o processo, pegando o medicamento e depositando-o na caixa para o embalo da fita.

### 🔗 Integração com o Sistema

&emsp;O leitor de QR code, **MH-ET Live Scanner V3.0**, está fisicamente conectado a uma **Raspberry Pi**, que atua como intermediária no envio dos dados para o sistema. Após a leitura de um QR code, a Raspberry envia os dados via requisição HTTP (POST) para um servidor local, onde o robô Dobot realiza o consumo dessa informação.

<div align='center'>
<sub>Figura 1 - Leitor de QR Code utilizado no projeto</sub>
</div>

<div align='center'>
<img src="../../img/qr_code_scanner.jpeg"/>
</div>

<div align='center'>
<sup>Fonte: Usinainfoo</sup>
</div>

&emsp;No lado do robô, a CLI realiza uma requisição GET para consumir a informação escaneada:

```python
rota_qrcode = "http://127.0.0.1:5000/qrcode-response"

def request_bip(timeout: int = 10):
    print("🕐 Solicitando bipagem via HTTP...")

    try:
        response = requests.get(rota_qrcode, timeout=timeout)
        response.raise_for_status()
        scanned_medicine = response.json()
        print(f"📡 Medicamento bipado recebido: {scanned_medicine}")
        return scanned_medicine

    except requests.exceptions.RequestException as e:
        print(f"⏳ Falha ao obter bipagem: {e}")
        return None
```

&emsp;Após a leitura do QR code, o sistema realiza uma **validação** comparando o medicamento bipado com o esperado, conforme o mapeamento da prescrição. Se a validação for bem-sucedida, o Dobot realiza a descida no eixo Z para coletar o medicamento. E depois prosseguir para a entrega na fita.

&emsp; A respeito de banco de dados, os dados dos medicamentos bipados são a**rmazenados em um banco de dados relacional** criado com **SQLite**, permitindo a realização das operações de **CRUD (Create, Read, Update, Delete)**. A API que recebe os dados escaneados realiza a criação de novos registros no banco, os quais podem ser:

- Visualizados diretamente pela **interface de logs e histórico**.

- Atualizados em caso de **correções manuais** por parte do farmacêutico.

- Removidos se identificada uma **leitura incorreta**.

&emsp;Com essa estrutura, o sistema de leitura de QR code atende plenamente aos critérios do projeto, ao garantir a rastreabilidade dos medicamentos por meio do armazenamento em banco de dados, possibilitar operações completas de CRUD sobre os dados registrados e expor essas informações de forma clara na interface de logs, permitindo o monitoramento e a verificação das leituras em tempo real.

&emsp;Dessa forma, o processo de separação automatizada se torna **seguro, validado e totalmente integrado ao fluxo da farmácia hospitalar**, contribuindo para maior precisão e confiabilidade nas operações.

## ❗ Sensor infravermelho

&emsp; O sensor infravermelho utilizado é um Tcrt5000 e sua leitura pode ser tanto digital (informando se existe algo na frente dele ou não) ou analógica (informando a distância que o objeto está do sensor). Sua utilização no projeto está voltada para as leituras digitais, onde utilizamos ele para verificar se houve ou não a coleta dos medicamentos após a descida do braço robótico.

<div align='center'>
<sub>Figura 2 - Tcrt5000</sub>
</div>

<div align='center' size="10%">
<img src="../../img/tcrt5000.jpg"/>
</div>

<div align='center'>
<sup>Fonte: institutodigital</sup>
</div>

&emsp; Caso o sensor identifique que após a descida do dobot o medicamento não foi coletado ele repete a ação no intuito de coletar definitivamente aquele medicamento. Caso a segunda tentativa seja falha o código passa para o próximo medicamento da lista e tenta realizar sua coleta.

```python
def ir_sensor(timeout: int=10):
    print("\U0001F551 Verificando coleta")
    try:
        response = requests.get("http://localhost:5000/api/sensores", timeout=timeout)
        response.raise_for_status()
        status_coleta = response.json().get("caught")

        print(f"\U0001F4E1 Estado sensor IR: {status_coleta}")
        if status_coleta == "ALTO":
            return False
        elif status_coleta == "BAIXO":
            return True
    except requests.exceptions.RequestException as e:
        print(f"⏳ Falha ao obter leitura: {e}")
        return None
```

&emsp; O código apresentado acima está presente em nossa CLI e é ele que recebe os POST's feitos pela raspberry na rota "api/sensores", sendo que o código presente no micro computador envia "ALTO" quando o valor de leitura do sensor está alto (representando que ele não coletou nada) e "BAIXO" quando a leitura está baixa (representando que houve a coleta do medicamento).