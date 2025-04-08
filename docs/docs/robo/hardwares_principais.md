---
title: "🖲️ Hardwares Principais"
sidebar_label: "Hardwares Principais"
sidebar_position: 1
---

## 🔍 O que é?

&emsp; Hardware periférico é um dispositivo que se conecta ao hardware principal de um computador ou dispositivo móvel para fornecer funcionalidades adicionais. No nosso projeto, vamos utilizar o leitor de Qr code e o sensor infravermelho usando um Raspberry Pi 5 (micro processador) para fazer a integração no nosso sistema.

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

&emsp;Com essa estrutura, o sistema de leitura de QR code atende plenamente aos critérios do projeto, ao garantir a rastreabilidade dos medicamentos por meio do armazenamento em banco de dados, possibilitar operações completas de CRUD sobre os dados registrados e expor essas informações de forma clara na interface de logs, permitindo o monitoramento e a verificação das leituras em tempo real. &

&emsp;Dessa forma, o processo de separação automatizada se torna **seguro, validado e totalmente integrado ao fluxo da farmácia hospitalar**, contribuindo para maior precisão e confiabilidade nas operações.

## ❗ Sensor infravermelho

&emsp; O sensor infravermelho ainda está em fase de desenvolvimento. Ele já foi soldado a jumpers que estão conectados às entradas do Raspberry Pi 5, mas enfrentamos dificuldades na integração, e por isso essa tarefa foi realocada para a sprint 5.

&emsp; Nosso objetivo com esse sensor é identificar a presença ou ausência do medicamento no compartimento. Durante o processo de separação, o robô realizará três tentativas de detecção. Se o sensor identificar a presença do medicamento, o robô continuará sua movimentação para pegá-lo. Caso contrário, ele passará para o próximo item. No estado atual do desenvolvimento, devido à falta de integração, o robô permanece parado nessa etapa.


