---
title: Integração
sidebar_label: Integração
sidebar_position: 8
---

# 🔗 Integração entre Módulos

## 🧠 Visão Geral

&emsp;A integração entre os principais componentes da solução **Prescript** — o **back-end**, o **front-end** e o **robô Dobot** — é fundamental para garantir um funcionamento fluido, seguro e eficiente de todo o sistema. Toda a comunicação é realizada por meio de requisições HTTP, que permitem a troca de dados em tempo real entre as interfaces e os dispositivos envolvidos.

&emsp;Atualmente, o sistema está estruturado da seguinte forma: o **robô**, operado via CLI, realiza uma requisição do tipo `GET` ao back-end para obter os dados da próxima prescrição. Esses dados são utilizados para guiar os movimentos do braço robótico, que realiza a coleta dos medicamentos. Em paralelo, a **Raspberry Pi**, responsável pela leitura dos QR codes dos medicamentos, envia as informações captadas ao servidor através de requisições do tipo `POST`. O back-end, por sua vez, processa essas informações, valida os medicamentos e responde com os dados esperados para garantir que apenas itens corretos sejam coletados.

---

## ✅ Funcionalidades Já Integradas

- 💊 **Separação Automatizada:**  
  Já é possível iniciar a separação de uma fita diretamente pela plataforma, por meio do botão *"Colocar em produção"*.  
  Isso atualiza o **status da prescrição no banco de dados** e também reflete automaticamente na interface do front-end, que organiza as fitas nas categorias *"A seguir"*, *"Em progresso"* e *"Pronta"*.  

  É possível verificar o funcionamento dessa funcionalidade no vídeo abaixo:

  <iframe width="560" height="315" src="https://www.youtube.com/embed/8u6nCybWm3U" title="YouTube video player"  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen sandbox="allow-same-origin allow-scripts allow-popups">
  </iframe>

- 🤖 **Integração do Robô com o Back-end:**  
  A CLI do robô realiza requisições `GET` para obter os medicamentos da prescrição atual, permitindo que o braço robótico realize os movimentos de separação de forma automatizada.

- 📷 **Integração do Leitor de QR Code:**  
  A Raspberry Pi, conectada ao sensor de leitura, realiza requisições `POST` com os dados dos medicamentos bipados. O back-end recebe essas informações e realiza a validação em tempo real, antes de autorizar a descida do robô.

- 📊 **Visualização de Dados no Front-end:**  
  Informações como fitas processadas, logs de movimentação e separações realizadas estão acessíveis na interface, alimentadas pelas rotas `GET` do back-end. O pop-up de coleta unitária já foi desenvolvido visualmente, e chama a rota de obtenção de prescrição.

---


## 🚧 Funcionalidades Ainda Pendentes

- 🧾 **Integração da Coleta Unitária:**  
  A funcionalidade visual da coleta unitária já está implementada, mas **a integração com a lógica de back-end ainda está pendente**. O pop-up precisa estar conectado à lógica de separação de medicamentos para funcionar corretamente.

- 🌐 **Dinamização do Endereço de Rede:**  
  O endereço IP usado atualmente está mockado diretamente no código. Isso significa que os testes funcionam apenas em um ambiente local específico.  
  Será necessário configurar um arquivo `.env` para permitir a definição dinâmica do IP, garantindo portabilidade e facilidade de deploy.

- 🔐 **Padronização de Ambientes e Documentação de Deploy:**  
  Ainda será desenvolvida uma documentação técnica explicando como configurar corretamente o IP, as portas e os arquivos `.env` para facilitar a replicação do ambiente de desenvolvimento ou testes.

---

## 🔄 Próximos Passos

&emsp;Para resolver a limitação do IP fixo e aumentar a robustez do sistema, a equipe irá implementar o uso de variáveis de ambiente via `.env`, utilizando bibliotecas como `dotenv`. Isso permitirá que URLs e configurações sejam alteradas de forma flexível, sem modificação direta no código. Com essa atualização, o sistema Prescript estará apto a operar em diferentes redes, com maior confiabilidade e escalabilidade.

&emsp;Assim, o processo de integração entre o **back-end**, o **robô Dobot**, a **Raspberry Pi** e o **front-end em React** estará mais consolidado, oferecendo uma base sólida para futuras expansões da plataforma.
