---
title: "🖲️ Hardwares Periféricos"
sidebar_label: "Hardwares Periféricos"
---

## 🔍 O que é?

&emsp; Hardware periférico é um dispositivo que se conecta ao hardware principal de um computador ou dispositivo móvel para fornecer funcionalidades adicionais. No nosso projeto, vamos utilizar o leitor de Qr code e o sensor infravermelho usando um Raspberry Pi Pico para fazer a integração no nosso sistema.

## 🏷️ Leitor de QR code

&emsp; No nosso projeto, o leitor de QR code é utilizado para registrar as informações dos medicamentos que estão sendo separados para a produção das fitas. Esses dados incluem nome do medicamento, quantidade, validade e lote. Durante a operação, o braço robótico se posiciona acima do bin, realiza a leitura do QR code e, em seguida, continua o processo, pegando o medicamento e depositando-o na caixa para o embalo da fita.

## ❗ Sensor infravermelho

&emsp; O sensor infravermelho ainda está em fase de desenvolvimento. Ele já foi soldado ao Raspberry Pi Pico, mas enfrentamos dificuldades na integração, e por isso essa tarefa foi realocada para a próxima sprint.
&emsp; Nosso objetivo com esse sensor é identificar a presença ou ausência do medicamento no compartimento. Durante o processo de separação, o robô realizará três tentativas de detecção. Se o sensor identificar a presença do medicamento, o robô continuará sua movimentação para pegá-lo. Caso contrário, ele passará para o próximo item. No estado atual do desenvolvimento, devido à falta de integração, o robô permanece parado nessa etapa.


