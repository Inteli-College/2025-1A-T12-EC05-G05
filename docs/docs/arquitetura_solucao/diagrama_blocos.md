---  
title: Diagrama de Blocos  
sidebar_label: Diagrama de Blocos  
---

# 🖥️ Diagrama de Blocos  

&emsp;O **diagrama de blocos** é uma representação visual essencial para entender a arquitetura do sistema. Ele ilustra como os diferentes componentes interagem entre si, facilitando no desenvolvimento do sistema.  

## 📌 O que é um Diagrama de Blocos?  

&emsp;Um **diagrama de blocos** representa os principais elementos de um sistema e suas conexões de maneira simplificada. Ele é utilizado para:  
- Visualizar a estrutura do sistema de forma clara.  
- Entender como os componentes interagem entre si.  
- Facilitar a identificação de melhorias e otimizações.  

## 🏗️ Arquitetura do Sistema  

<div align="center">

  <sub>Figura 1 - Diagrama de Blocos </sub>

  <img src="/img/diagrama_blocos.png"/>

  <sup>Fonte: Material produzido pelos autores (2025).</sup>

</div>

O diagrama acima ilustra a estrutura do sistema, detalhando as interações entre os diferentes módulos.  

## ⚙️ Estrutura e Componentes  

### 🔹 Backend 
O **backend** é responsável por gerenciar e controlar todas as operações do sistema, garantindo a comunicação entre os módulos. Ele:  
- Troca informações com o **banco de dados**, garantindo o armazenamento e a recuperação dos dados.  
- Se conecta à **API do Hospital das Clínicas**, permitindo integração com o sistema hospitalar.  
- Envia comandos para o **robô**, controlando a produção automatizada.  
- Recebe dados do **leitor de QR Code** e processa as informações para determinar a próxima ação.  
- Envia informações para o **frontend**, garantindo que os usuários tenham acesso atualizado aos dados necessários para validação e aprovação das prescrições.

### 🗄️ Banco de Dados 
O **banco de dados (SQL)** armazena as informações essenciais do sistema, incluindo:  
- Registros de prescrições médicas.  
- Dados dos usuários (enfermeiros e farmacêuticos).  
- Histórico de produção das fitas.  

O backend se comunica constantemente com o **banco de dados**, garantindo que todas as informações estejam atualizadas.  

### 🔗 API do Hospital das Clínicas
A API do Hospital das Clínicas permite a integração com o sistema hospitalar existente, possibilitando o envio e recebimento de informações relacionadas às prescrições médicas. Essa comunicação garante que o sistema esteja sempre atualizado e alinhado com os registros hospitalares.

### 🖥️ Frontend
O sistema conta com **duas interfaces distintas**, cada uma projetada para um perfil específico:  

**Interface do Enfermeiro**  
- Exibe as informações da fita para que o enfermeiro possa **validar se a fita foi feita corretamente**.  

**Interface do Farmacêutico**  
- Possui funcionalidades completas, permitindo, por exemplo:  
  - Aprovação da prescrição médica.  
  - Encaminhamento da fita para produção.  

O frontend se comunica diretamente com o **backend**, garantindo que todas as ações dos usuários sejam processadas e registradas corretamente.  

### 📡 Leitor de QR Code  
O **leitor de QR Code** tem um papel fundamental na captura das informações das prescrições médicas. O fluxo de comunicação ocorre da seguinte forma:  
1. O leitor envia os dados para o **backend**.  
2. O backend processa as informações.  
3. O backend instrui o **robô** sobre a ação a ser tomada.  

O leitor apenas **envia informações**, sem receber comandos, tornando seu funcionamento simples e eficiente.  

### 🤖 Controle do Robô  
O **robô** é responsável pela produção das fitas, seguindo rigorosamente os comandos do backend. O fluxo de controle funciona da seguinte forma:  
1. O backend processa os dados da prescrição.  
2. O backend envia instruções ao robô.  
3. O robô executa a ação correspondente.  

## ✅ Conclusão  

Essa arquitetura foi desenvolvida para garantir **segurança, escalabilidade e integração** com o ambiente hospitalar. A separação entre backend, banco de dados, API externa, frontend e dispositivos auxiliares permite um fluxo operacional **eficiente e confiável**.  

Com esse sistema, asseguramos que as **prescrições médicas sejam validadas corretamente** e que **as fitas sejam produzidas com precisão**, otimizando o tempo dos profissionais de saúde e garantindo a segurança dos pacientes.