---  
title: Diagrama Detalhado do Sistema  
sidebar_label: Diagrama Detalhado do Sistema  
sidebar_position: 1
---

# 🖥️ Diagrama Detalhado do Sistema  

## 📌 O que é um Diagrama de Blocos?  
&emsp; Um diagrama de blocos é uma representação visual que ilustra a interação entre os diferentes componentes de um sistema. Esse tipo de diagrama facilita a compreensão da arquitetura do sistema e auxilia na análise e otimização dos processos envolvidos.

## 📌 Visão Geral do Sistema
&emsp;O sistema desenvolvido busca automatizar a distribuição de medicamentos dentro da farmácia hospitalar, garantindo maior precisão, eficiência e segurança no atendimento aos pacientes. Ele é composto por diversos módulos interligados que incluem tanto sistemas computacionais (backend, frontend e banco de dados) quanto dispositivos físicos como robôs, sensores e leitores de QR code.

<div align="center">

  <sub>Figura 1 - Diagrama de Blocos </sub>

  <img src="../../img/arquiteraDetalhadaBlocos.jpeg"/>

  <sup>Fonte: Material produzido pelos autores (2025).</sup>

</div>

## 📌 Componentes Principais

### 🔹 Backend
&emsp; O **backend** gerencia todas as operações do sistema, garantindo a integração entre os dispositivos físicos e os sistemas de software. Suas principais funções incluem:
- Receber dados do **Leitor de QR Code (MH-ET LIVE Scanner v3.0)** e interpretar as informações dos medicamentos solicitados.
- Processar os comandos para o **robô**, orientando a coleta e a distribuição dos medicamentos.
- Sincronizar dados com o **banco de dados**, garantindo a rastreabilidade e controle do fluxo de medicamentos.
- Enviar e receber informações da **API do sistema**, para cruzamento de dados de prescrição e acompanhamento do fluxo de retirada dos medicamentos.
- Comunicar-se com o **frontend** para exibir as informações em tempo real aos usuários.

## 🗄️ Banco de Dados
&emsp; O banco de dados armazena informação de forma segura e estruturada. Ele contem:
- **Registro de medicamentos** contendo validade e lote dentro da farmácia.
- **Solicitações e status** das fitas médicas solicitadas pelos médicos.
- **Histórico das fitas de medicamentos**, garantindo rastreabilidade total desde o armazenamento até a entrega ao profissional de saúde.
- **Registros de Acesso** ao sistema para auditoria e segurança.

## ⚙️ API
&emsp; A API desempenha um papel central na comunicação entre os diferentes componentes do sistema, permitindo a troca de dados entre o back-end, o banco de dados e o front-end.

A API fornece endpoints para:
- **Consulta de medicamentos:** Recupera informações detalhadas sobre os medicamentos armazenados.
- **Registro de movimentações:** Registra ações realizadas pelo robô, incluindo retirada e armazenamento de medicamentos.
- **Autenticação e controle de acesso:** Garante que apenas usuários autorizados possam interagir com o sistema.
- **Integração com o leitor de QR Code:** Processa os códigos escaneados e recupera os dados correspondentes.

**Tecnologias Utilizadas:**
- Linguagem: Python (Flask)
- Banco de Dados: SQLite
- Comunicação: Protocolo HTTP (GET, POST, PATCH, PUT e DELETE)


## 🤖 Robô e Sensores Integrados
O **robô** é a peça central da automação, sendo responsável por realizar a coleta e distribuição precisa dos medicamentos para as respectivas estações. O controle do robô ocorre em conjunto com sensores e outros dispositivos integrados:

### 📡 Leitor de QR Code (Mecânica de Identificação dos medicamentos)
O **Leitor de QR Code (MH-ET LIVE Scanner v3.0)** tem papel essencial na identificação e seleção dos medicamentos corretos.

1. O leitor escaneia os **QR codes** presentes nos **bins** (caixinhas de medicamento) para garantir que o remédio certo está sendo coletado.
2. Os dados capturados pelo leitor são enviados ao **Raspberry Pi**, que processa a informação e transmite ao **backend** para verificação com os registros do banco de dados.
3. Caso haja erro ou incompatibilidade entre a solicitação e o medicamento escaneado, o sistema emite um alerta para evitar erros.

### 🌡️ Sensor de Infravermelho(TRCT 5000)
O sensor **infravermelho** garante que o robô execute a coleta de forma precisa ao identificar se há ou não presença do medicamento na mão robótica. O funcionamento ocorre da seguinte maneira:
1. O sensor detecta a proximidade do robô em relação ao **bin de medicamentos**.
2. O sinal infravermelho é enviado ao **Raspberry Pi**, que processa a informação e ajusta a posição do robô para um alcance exato.
3. O **robô** realiza a coleta com alta precisão e envia a confirmação ao **backend**.

### 💻 Raspberry Pi e sua Função no Sistema
O **Raspberry Pi** desempenha outro papel central na interação entre os dispositivos físicos. Suas principais funções incluem:
- **Integração com o robô**, enviando sinais de controle para realizar a movimentação.
- **Processamento de dados do infravermelho**, ajustando a posição do robô para coletar os medicamentos.
- **Comunicação com o leitor de QR Code**, garantindo que os dados das caixinhas sejam processados antes da movimentação do robô.
- **Comunicação com o Backend**, garantindo que tudo seja executado de maneira correta.

### 🖥️ Frontend e Interface de Usuário
O **frontend** fornece uma interface intuitiva para os **farmacêuticos** interagirem com o sistema. Ele permite:
- Acompanha o status da coleta dos medicamentos;
- Selecionar quais fitas serão produzidas em um dado momento;
- Exportar o histórico de fitas produzidas;
- Exibe alertas de falhas ou erros na seleção dos medicamentos;
- Observar a exibição de dados em tempo real.

## 📌 Diagrama em blocos Atualuzada
&emsp;À medida que o projeto evolui, é fundamental manter o diagrama em blocos sempre atualizado para refletir com precisão a arquitetura do sistema. Isso garante que qualquer modificação, adição ou remoção de componentes durante o desenvolvimento seja registrada. Para melhorar a representação das interações entre os componentes, foram adicionadas indicações de entrada e saída (input e output), tornando o diagrama mais claro e fiel ao funcionamento do projeto.
&emsp; 

<div align="center">

  <sub>Figura 1 - Diagrama de Blocos </sub>

  <img src="../../img/diagrama_de_blocos.png"/>

  <sup>Fonte: Material produzido pelos autores (2025).</sup>

</div>


 &emsp; **Componentes e Interações**

- **Minicomputador:**  Atua como o cérebro e o controlador central do sistema. Ele recebe requisições via protocolo HTTP e, com base nelas, envia comandos (inputs) para o robô, o sensor infravermelho ou o leitor de QR Code, coordenando suas ações. Além disso, processa os outputs recebidos desses componentes para garantir a execução correta das tarefas.
- **Robô:** Recebe comandos do minicomputador (input), como, por exemplo, pegar um medicamento do bin 1. Após executar a ação, o robô envia um feedback (output) ao minicomputador para confirmar se a tarefa foi realizada com sucesso.
- **Leitor de QR Code:** Recebe um comando (input) para escanear um QR Code. Após a leitura, envia um sinal (output) para o minicomputador confirmando a leitura e repassando as informações obtidas.
- **Sensor infravermelho:** Recebe um comando (input) para medir a distância do leitor até a superfície para verificar a presença do medicamento. Em seguida, envia um sinal (output) informando a distância medida e indicando se há ou não um medicamento no local.

## ✅ Conclusão
O sistema automatizado de separação de medicamentos integra diversos componentes para otimizar o fluxo de trabalho da farmácia hospitalar, garantindo **precisão, segurança e agilidade** no manuseio dos medicamentos.

A presença do **Raspberry Pi**, dos sensores **infravermelhos** e do **Leitor de QR Code** aprimoram a segurança e a confiabilidade do sistema, reduzindo falhas humanas e garantindo que os medicamentos sejam corretamente identificados e entregues.


