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

## 📌 Diagrama em blocos Atualizada
&emsp; À medida que o projeto evolui, é fundamental manter o diagrama em blocos sempre atualizado para refletir com precisão a arquitetura do sistema. Isso garante que qualquer modificação, adição ou remoção de componentes durante o desenvolvimento seja devidamente registrada. Para melhorar a representação das interações entre os componentes, foram adicionados os tipos de comunicação entre o robô, o sensor infravermelho e o leitor de QR Code com o minicomputador, tornando o diagrama mais claro e fiel ao funcionamento do projeto.

<div align="center">

  <sub>Figura 2 - Diagrama de Blocos atualizada</sub>

  <img src="../../img/diagrama_de_blocos.png"/>

  <sup>Fonte: Material produzido pelos autores (2025).</sup>

</div>


 ## 📌 Interações e Tipos de Comunicação

 &emsp;Para garantir a coordenação eficiente entre os componentes do sistema, diferentes tipos de comunicação foram implementados de acordo com as necessidades de cada dispositivo. O **braço robótico** e o **leitor de QR** Code se comunicam com o minicomputador por meio de comunicação serial, permitindo uma troca de dados estruturada. Essa comunicação é essencial para enviar comandos específicos — como movimentar o braço para um determinado bin ou iniciar a leitura de um QR Code — e receber respostas confirmando a execução das ações.

 &emsp;Já o **sensor infravermelho** está conectado diretamente ao Raspberry Pi e atua como um componente de detecção simples, enviando sinais ao minicomputador para indicar se há ou não um objeto (neste caso, o medicamento) na garra do braço robótico. Ele não realiza uma comunicação estruturada como os dispositivos seriais, mas envia um sinal digital direto que é interpretado pelo Raspberry. Dessa forma, o minicomputador consegue identificar se o braço robótico conseguiu pegar corretamente o medicamento, contribuindo para o controle e a validação das ações do sistema.



## ✅ Conclusão
&emsp;O sistema automatizado de separação de medicamentos integra diversos componentes para otimizar o fluxo de trabalho da farmácia hospitalar, garantindo **precisão, segurança e agilidade** no manuseio dos medicamentos.

&emsp;A presença do **Raspberry Pi**, dos sensores **infravermelhos** e do **Leitor de QR Code** aprimoram a segurança e a confiabilidade do sistema, reduzindo falhas humanas e garantindo que os medicamentos sejam corretamente identificados e entregues.


