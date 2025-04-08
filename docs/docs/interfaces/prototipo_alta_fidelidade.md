---
title: Protótipo de Alta Fidelidade
sidebar_label: Alta Fidelidade e Front-End
sidebar_position: 6
---

# ✨ Protótipo de Alta Fidelidade e Front-End

## 🔍 O que é?

&emsp; O **protótipo de alta fidelidade** representa a **versão final e interativa** da interface do sistema Prescript, sendo o resultado do refinamento visual e funcional dos wireframes elaborados nas etapas anteriores. Ao contrário do Wire Flow, esse protótipo apresenta **elementos visuais realistas, com cores, tipografia, botões e layouts finais**, além de permitir a navegação simulada pelos fluxos reais da plataforma.

:::info
O objetivo do protótipo é **validar a experiência completa do usuário** com uma interface fiel ao produto final, servindo como guia visual para o time de desenvolvimento e facilitando testes com usuários.
:::

&emsp; No caso do **Prescript**, plataforma desenvolvida para o **Hospital de Clínicas da UNICAMP**, o protótipo foi focado exclusivamente na **jornada do farmacêutico**, responsável pela operação do robô, empacotamento das fitas e gerenciamento de medicamentos.

&emsp; As interfaces foram desenvolvidas no **Figma**, incorporando feedbacks da equipe técnica e considerando os desafios reais enfrentados no ambiente hospitalar.

---

## 🎯 Objetivos do Protótipo

- Garantir **clareza e usabilidade** na navegação da plataforma;
- Representar **fielmente os fluxos funcionais** do sistema;
- Permitir **validação visual com stakeholders** e profissionais da saúde;
- Servir como base para **implementação front-end** e testes com farmacêuticos.

---

## 🖥️ Telas Disponíveis

### 1️⃣ Tela de Login

<div align='center'>
<sub>Figura 1 - Tela de Login (Alta Fidelidade)</sub>
</div>

<img src="../../img/altafid_login.png"/>

🔹 Tela de entrada da plataforma.  
🔹 Possui campos de e-mail e senha com validação.  
🔹 Apresenta feedback de erro em caso de credenciais inválidas.  
🔹 Após o login, o usuário é redirecionado para a tela de separação.

---

### 2️⃣ Tela Geral de Prescrições (Separação)

<div align='center'>
<sub>Figura 2 - Tela Geral de Prescrições</sub>
</div>

<img src="../../img/altafid_homepage.png"/>

🔹 Divide as fitas de medicamentos em três categorias:
- **A seguir**: aguardando início de separação.
- **Em progresso**: sendo separadas pelo robô.
- **Prontas**: fitas já separadas.

🔹 Permite selecionar uma ou mais fitas e colocá-las em separação com um clique.  
🔹 Apresenta status visuais e indicadores de medicamentos pendentes.

---

### 3️⃣ Tela de Histórico de Fitas

<div align='center'>
<sub>Figura 3 - Tela de Histórico</sub>
</div>

<img src="../../img/altafid_historico.png"/>

🔹 Permite ao farmacêutico consultar fitas separadas por data.  
🔹 Filtros de status (Prontas, Expiradas).  
🔹 Botão para exportar relatórios em diferentes períodos.  
🔹 Visualização clara do histórico de produção do robô.

---

### 4️⃣ Visualização do Card da Fita

<div align='center'>
<sub>Figura 4 - Card de Fita Médica</sub>
</div>

<img src="../../img/altafid_card.png"/>

🔹 Traz os detalhes completos da fita de medicamentos:  
- Nome dos medicamentos  
- Dosagem  
- Validade  
- Status atual  
- Farmacêutico responsável

🔹 Interface clara para rastreabilidade.

---

### **5️⃣ Pop-up de Coleta Unitária**

<div align='center'>
<sub>Figura 5 - Pop-up de Coleta Unitária</sub>
</div>

<img src="../../img/altafid_popup_coleta_unitaria.png"/>

🔹 Formulário com dois campos:  
  - **Dropdown de medicamentos** disponíveis para separação manual.  
  - **Dropdown de enfermeiros** responsáveis pela administração.  

🔹 Usado em situações de exceção onde a coleta precisa ser feita fora do fluxo automatizado.

---

### **6️⃣ Tela de Logs**

<div align='center'>
<sub>Figura 6 - Tela de Logs</sub>
</div>

<img src="../../img/altafid_logs.png"/>

🔹 Lista cronológica de eventos e movimentações do sistema.  
🔹 Inclui registros de ações do robô, falhas, coletas manuais, status de fitas, entre outros.  
🔹 Ajuda no rastreamento de processos e suporte técnico.

---

### **7️⃣ Tela de Devolução de Fitas**

<div align='center'>
<sub>Figura 7 - Tela de Devolução</sub>
</div>

<img src="../../img/altafid_devolucao.png"/>

🔹 Apresenta duas seções principais:
  - **Fitas esperadas para devolução**
  - **Fitas já devolvidas**

🔹 Auxilia no processo de reintegração dos medicamentos ao sistema.  
🔹 Integrada com o botão de ativação de devolução.

---

### **8️⃣ Pop-up de Início de Devolução**

<div align='center'>
<sub>Figura 8 - Pop-up de Início de Devolução</sub>
</div>

<img src="../../img/altafid_card_devolucao.png"/>

🔹 Permite iniciar o processo de devolução de uma fita específica.  
🔹 Confirma a operação e ativa o modo de retorno ao bin pelo robô.

---

### **9️⃣ Filtragem da tela de logs**

<div align='center'>
<sub>Figura 9 - Filtro da tela de logs</sub>
</div>

<img src="../../img/filtro.png"/>

🔹 Permite encontrar rapidamente registros específicos, ao utilizar as filtragens disponíveis:
- **Ações do Robô**
- **Medicamentos**
- **Usuário**
- **Fitas de medicamento**  

🔹 Permite filtrar um ou mais registros.  
🔹 Facilita o rastreamento de processos e suporte técnico.

---

### **🔟 Tela de Inventário**

<div align='center'>
<sub>Figura 10 - Tela de inventário</sub>
</div>

<img src="../../img/tela_de_inventario.png"/>


🔹 Permite adicionar bins  
🔹 Permite acessar informações de todos os bins em uso:
- nome do medicamento junto com a dosagem
- validade
- lote
- quantidade

---

### **1️⃣1️⃣ Pop-up Cadastro de Bin**

<div align='center'>
<sub>Figura 11 - Pop-up de Cadastro de Bin</sub>
</div>

<img src="../../img/popup_cadastro_bin.png"/>

🔹Pop-up para adição do novo bin  
🔹forms para preencher as informações do novo bin a ser adicionado: 
- nome do medicamento 
- lote
- validade
- quantidade
- posições  

🔹 botão para adicionar o bin 

---


## 💻 Desenvolvimento do Front-end (React.js)

&emsp;O front-end da aplicação foi desenvolvido em **React.js**, com base direta no protótipo de alta fidelidade descrito acima. O objetivo é garantir uma interface funcional, fluida e fiel ao que foi planejado na prototipação.

### 📦 Funcionalidades :

- Visualização de **filtros de fitas por status**: A seguir, Em progresso, Pronta.
- Avanço de status para fitas colocadas em produção.
- **Card detalhado da fita**, com QR code e informações dos medicamentos associados.
- **Tabela de histórico** com possibilidade de exportação filtrada por data.
- **Tabela de logs do sistema**, com registros de operação e falhas ocorridas.
- Componente de **pop-up de coleta unitária** com formulário dinâmico.
- **Integração parcial com o back-end e CLI do robô**.
- Modo de **devolução ativado** diretamente pela interface da tela de devoluções.
- Tela de **cadastro de bin**. 
- Funcionalidade de **filtro nos logs** do sistema.

---

&emsp;Com esse conjunto de funcionalidades, o sistema oferece ao farmacêutico a gestão completa de todo o processo — desde a separação dos medicamentos até a etapa de devolução. Também é possível realizar o cadastro de novos bins, além de controlar o estoque e a validade dos medicamentos, tudo de forma centralizada na plataforma Prescript.

## 🎞️ Overview do Front-end em Ação

Abaixo, está um vídeo demonstrando o funcionamento das principais funcionalidades da plataforma já implementadas no front-end:

<div align="center">
  <sub>🎬 Overview do Front-end em React.js</sub>

  <br/>  
  <iframe width="560" height="315" src="https://www.youtube.com/embed/CH8m1hx7Zac" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen sandbox="allow-same-origin allow-scripts allow-popups"></iframe>
  <br/>
  <sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>


---

## 💡 Conclusão

&emsp;A junção entre o protótipo de alta fidelidade e o desenvolvimento front-end garante consistência entre a **visão projetada** e a **experiência real do usuário**. Com essa base sólida, o Prescript avança para se tornar uma ferramenta de grande impacto no contexto hospitalar, unindo **interface intuitiva**, **segurança na separação de medicamentos** e **integração com automação robótica**.

