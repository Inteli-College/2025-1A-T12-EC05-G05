---
title: "🖲️ Hardwares Principais"
sidebar_label: "Hardwares Principais"
sidebar_position: 1
---

## 🔍 O que são?

&emsp; **Hardwares principais** são os componentes físicos centrais de um sistema computacional que desempenham funções essenciais para a execução das tarefas do projeto. Eles são responsáveis pelo processamento, controle e execução das operações, servindo como base para a integração de periféricos e sensores.

&emsp; Neste projeto, os hardwares principais são o **Dobot**, que realiza a manipulação física dos medicamentos, e o **Raspberry Pi 5**, que atua como o núcleo de controle, comunicação e leitura de sensores.

## 🦾 Robô Dobot

&emsp; O **Dobot** utilizado no projeto é responsável pela coleta dos medicamentos nos "bins", a coleta dos QR codes de identificação de fita onde eles serão embalados. Ele é controlado via comandos enviados por uma interface de linha de comando (CLI) e pelo nosso backend, que orquestra as ações com base nas leituras realizadas (como o QR code e o sensor infravermelho).

### 🔗 Integração com o Sistema

&emsp; O Dobot recebe comandos a partir de um sistema central que coleta os dados de entrada do QR code e infravermelho. Ao receber comandos de movimentação, eles são enviados para o robô, indicando a coordenada de coleta. Após chegar ao local de coleta, ocorre a leitura do QR code e validação dos medicamentos. Se o medicamento for validado, o robô inicia a coleta; caso contrário, o código passa para o próximo item da lista.

&emsp; Para validar se a coleta ocorreu, antes de realizar a entrega do medicamento, o sistema analisa os dados do sensor infravermelho para saber se a coleta foi um sucesso. Após todas essas validações, o Dobot se movimenta para o destino de entrega. Por fim, depois de realizar esses processos com todos os medicamentos solicitados, ele escaneia um QR code de identificação das fitas, coleta e deposita ele na caixa de entrega, associando os medicamentos à fita correspondente.

<iframe width="560" height="315" src="https://www.youtube.com/embed/k93B4q2ITE8?si=GEAbHr1Njj3n_tua" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style={{display:"block", marginLeft:"auto", marginRight:"auto"}}></iframe>
<br></br>

&emsp; Além disso, o robô está preparado para integrar sensores auxiliares e responder a condições externas, como a ausência de um item, usando os dados enviados pela Raspberry Pi.

## 🍓 Microcomputador Raspberry Pi 5

&emsp; O **Raspberry Pi 5** atua como o cérebro auxiliar do sistema, sendo responsável pela coleta de dados dos sensores e envio de informações ao servidor. Sua escolha se deu por sua capacidade de processamento, suporte a diversas interfaces de hardware e conectividade via rede.

### 💻 Acesso Remoto via SSH

&emsp; Para facilitar o desenvolvimento e manutenção do sistema, o Raspberry Pi 5 pode ser acessado remotamente via SSH. Isso permite a execução de comandos, edição de arquivos e monitoramento em tempo real.

- **Comando de acesso SSH:**

```bash
ssh g5@10.128.0.191
```

- **Senha:**

```bash
grupo5
```

&emsp; Esse acesso é essencial para atualizações do sistema, testes dos sensores e depuração de problemas durante o funcionamento do projeto.
