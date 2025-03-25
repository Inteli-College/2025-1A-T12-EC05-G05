---
title: Protótipo de Alta Fidelidade
sidebar_label: Protótipo de Alta Fidelidade
sidebar_position: 6
---

# ✨ Protótipo de Alta Fidelidade

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

<img src="../img/altafid_login.png"/>

🔹 Tela de entrada da plataforma.  
🔹 Possui campos de e-mail e senha com validação.  
🔹 Apresenta feedback de erro em caso de credenciais inválidas.  
🔹 Após o login, o usuário é redirecionado para a tela de separação.

---

### 2️⃣ Tela Geral de Prescrições (Separação)

<div align='center'>
<sub>Figura 2 - Tela Geral de Prescrições</sub>
</div>

<img src="../img/altafid_homepage.png"/>

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

<img src="../img/altafid_historico.png"/>

🔹 Permite ao farmacêutico consultar fitas separadas por data.  
🔹 Filtros de status (Prontas, Expiradas).  
🔹 Botão para exportar relatórios em diferentes períodos.  
🔹 Visualização clara do histórico de produção do robô.

---

### 4️⃣ Visualização do Card da Fita

<div align='center'>
<sub>Figura 4 - Card de Fita Médica</sub>
</div>

<img src="../img/altafid_card_fita.png"/>

🔹 Traz os detalhes completos da fita de medicamentos:  
- Nome dos medicamentos  
- Dosagem  
- Validade  
- Status atual  
- Farmacêutico responsável

🔹 Interface clara para rastreabilidade.

---

## 🔄 Principais Fluxos de Usuário (Alta Fidelidade)

### ✅ Acessar a Plataforma
- Acesso via login.
- Redirecionamento para a tela de separação de fitas.

### ✅ Colocar Fitas em Separação
- Seleção de fitas na aba **"A seguir"**.
- Botão para iniciar a separação (movidas automaticamente para **"Em progresso"**).
- Robô inicia separação com base nas prescrições.

### ✅ Visualizar Histórico
- Acesso via botão no menu superior.
- Filtros por data e status.
- Exportação de relatórios em PDF/CSV.

### ✅ Ver Detalhes da Fita
- Clique em qualquer fita listada nas telas de separação ou histórico.
- Exibição completa dos dados da fita, com QR code e composição.


## 💡 Conclusão

&emsp; O **protótipo de alta fidelidade** do Prescript foi essencial para validar visualmente a experiência do farmacêutico, desde o login até a exportação dos relatórios. Essa versão reflete a identidade visual e os fluxos reais da aplicação final, antecipando interações e possíveis melhorias antes do desenvolvimento.

&emsp; Com base neste material, a equipe de desenvolvimento tem um guia claro e validado para a construção da interface real do sistema.
