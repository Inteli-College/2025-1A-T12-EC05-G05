---
title: Wire Flow
sidebar_label: Wire Flow
sidebar_position: 6
---

# 🔁 Wire Flow  

## 🔍 O que é?  

&emsp; O **Wire Flow** é uma representação visual do fluxo de usuário (*User Flow*), mas com um diferencial: **ele tangibiliza a experiência do usuário através das telas da aplicação**. Enquanto o *User Flow* descreve a jornada do usuário dentro do sistema de forma abstrata, o *Wire Flow* ilustra esse caminho por meio das **interfaces reais**, ajudando a visualizar como cada interação acontece na prática.  

:::info

Seu principal objetivo é <b>alinhar experiência do usuário, design e desenvolvimento</b>, garantindo que a navegação seja fluida e eficiente. 

Além disso, o <i>Wire Flow</i> permite antecipar possíveis obstáculos antes mesmo da implementação, reduzindo retrabalho e melhorando a usabilidade da aplicação.  
:::

&emsp; No contexto do **Prescript**, desenvolvido para o **Hospital de Clínicas da UNICAMP**, o *Wire Flow* facilita a construção da plataforma ao conectar as **User Stories** do farmacêutico com as telas que representam cada etapa da jornada do usuário. Menciona-se que o *Wire Flow* foi elaborado **exclusivamente para a jornada do farmacêutico**, uma vez que foi entendido, pelo grupo, que a enfermeira não terá um contato direto com a plataforma. O foco da aplicação web está assim na **separação e rastreabilidade dos medicamentos** pelo farmacêutico, garantindo um processo mais seguro e eficiente.  

&emsp;Dessa forma, o *Wire Flow* se torna uma ferramenta essencial para o desenvolvimento de um sistema **intuitivo, eficiente e com menor taxa de erros**.  

---

## 🎯 Como funciona?  

&emsp; O *Wire Flow* é estruturado com base nas **User Stories** do farmacêutico, que descrevem as ações necessárias para a validação e gerenciamento da separação de medicamentos. A partir dessas histórias, definimos as **telas e os caminhos possíveis** que ele pode seguir dentro da aplicação. As telas, nesse primeiro momento, são como o próprio nome do _Wire Flow_ sugere, *Wireframes*, que nada mais são do que esboços dos principais elementos a serem considerados para aquela interface em si.  

:::note

#### 📂 **Acesso ao Wireflow e Detalhamento das Telas**  

Para visualizar **todas as telas da aplicação** e os **fluxos mapeados em detalhes**, acesse o protótipo no Figma:  

🔗 **[Wireflow Prescript - Figma](https://www.figma.com/design/mTmSbriLSMBXScYLQt8FNS/Wireframe-Prescript?node-id=81-1874&t=ek58XkjD6Rbm9391-1)**  
:::

&emsp; Abaixo, estão as **principais telas do Prescript** e seus respectivos fluxos dentro da plataforma:  

---

## 🖥️ **Principais Telas da Plataforma**  

### **1️⃣ Tela de Login**  

<div align='center'>
<sub>Figura 1 - Tela de Login do Prescript</sub>
</div>

<img src="/img/login_wireframe.png"/>

<div align ='center'>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>

🔹 Permite o acesso à plataforma via credenciais.  
🔹 Conta com feature já implementada de autenticação. <br/>
🔹 **User Flow relacionado:** *Acessar a plataforma fazendo login.*  


### **2️⃣ Tela Geral de Prescrições**  

<div align='center'>
<sub>Figura 2 - Tela Geral de Prescrições</sub>
</div>

<img src="/img/homepage_wireframe.png"/>

<div align ='center'>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>

🔹 Exibe **todas as fitas de medicamentos**, divididas em três categorias:  
   - **A seguir** → Fitas aguardando separação.  
   - **Em progresso** → Fitas cuja separação já foi iniciada.  
   - **Pronta** → Fitas já separadas pelo robô.

🔹 **User Flow relacionado:** *Colocar uma fita em progresso.*  

### **3️⃣ Tela de Histórico de Fitas**  

<div align='center'>
<sub>Figura 3 - Tela de Histórico do Wireframe</sub>
</div>

<img src="/img/historico_wireframe.png"/>

<div align ='center'>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>

🔹 Permite **consultar fitas já processadas**.  
🔹 Possibilita a **exportação de relatórios** de fitas prontas ou expiradas dentro de um período específico.  
🔹 **User Flow relacionado:** *Exportar relatório de fitas prontas ou expiradas.*  

### **4️⃣ Tela de Visualização do Card da Fita**  

<div align='center'>
<sub>Figura 4 - Card da Fita de Medicamentos</sub>
</div>

<img src="/img/card_fita_medicamentos.png"/>

<div align ='center'>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>

🔹 Apresenta **detalhes da fita**, incluindo:  
   - Status  
   - Lista de medicamentos  
   - Datas de validade  
   - Farmacêutico responsável pela aprovação  

🔹 **User Flow relacionado:** *Visualizar o card da fita.*  

---

## 🔄 **Fluxos de Usuário**  

### **1️⃣ Fluxo de Acessar a Plataforma (Login)**  
**User Story:**  
*"Como farmacêutico, quero acessar a plataforma com credenciais seguras para validar prescrições."*  

<div align='center'>
<sub>Figura 5 - Fluxo de Login na Plataforma</sub>
</div>

<img src="/img/login_wireflow.png"/>

<div align ='center'>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>

📌 **Passos do fluxo:**  
1. Usuário acessa a tela de **Login**.  
2. Insere suas **credenciais**.  
3. O sistema valida os dados e redireciona para a **Tela Geral de Prescrições**.   


### **2️⃣ Fluxo de Visualizar o Card da Fita**  
**User Story:**  
*"Como farmacêutico, quero visualizar os detalhes de uma fita de medicamentos para verificar sua composição e rastreabilidade."*  

<div align='center'>
<sub>Figura 6 - Fluxo de Visualizar o Card da Fita na Plataforma</sub>
</div>

<img src="/img/card_wireflow.png"/>

<div align ='center'>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>

📌 **Passos do fluxo:**  
1. Usuário acessa a **Tela Geral de Prescrições**, após login.  
2. Visualiza os filtros de status das fitas conforme necessidade (**A seguir, Em progresso, Pronta**).  
3. Clica em uma fita específica para **visualizar seus detalhes**.  
4. O sistema exibe a **Tela de Visualização do Card da Fita**.  


### **3️⃣ Fluxo de Colocar uma Fita em Progresso**  
**User Story:**  
*"Como farmacêutico, quero alterar o status de uma fita para 'Em progresso' para indicar que sua separação foi iniciada."*  

<div align='center'>
<sub>Figura 7 - Fluxo de Colocar uma Fita em Progresso</sub>
</div>

<img src="/img/historico_wireflow.png"/>

<div align ='center'>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>

📌 **Passos do fluxo:**  
1. Usuário acessa a **Tela Geral de Prescrições**.  
2. Seleciona uma fita ou todas as fitas disponíveis na aba **"A seguir"**.  
3. Clica na opção **"Colocar em produção"**.  
4. O sistema move a(s) fita(s) para a categoria **"Em progresso"** e o robô a coloca na fila para separação.  


### **4️⃣ Fluxo de Exportar Relatório**  
**User Story:**  
*"Como farmacêutico, quero exportar um relatório de fitas de medicamentos que ficaram prontas em determinado período."*  

<div align='center'>
<sub>Figura 8 - Fluxo de Exportar Relatório das Fitas</sub>
</div>

<img src="/img/historico_wireflow.png"/>

<div align ='center'>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>

📌 **Passos do fluxo:**  
1. Usuário acessa a **Tela de Histórico de Fitas**.  
2. Seleciona o período em que se deseja exportar o relatório.  
3. Clica em **Exportar Relatório**.  
4. O sistema gera um arquivo com os dados solicitados.  

---
## 🦾 Prototipagem no Figma

&emsp; Além das descrições sobre as telas e os fluxos dispostas acima, é possível também verificar **a prototipagem desenvolvida** com as telas, também no Figma, para guiar os principais fluxos do usuário no vídeo abaixo:  

<div align='center'>
<sub>Vídeo 1 - Prototipagem dos Principais Fluxos</sub>
</div>

<img src="/img/prototipagem_video.gif"/>

<div align ='center'>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>

## ✅ Conclusão  

&emsp; O **Wire Flow** é uma ferramenta essencial para conectar a **jornada do farmacêutico, as telas da aplicação e as User Stories**. Ele possibilita que designers e desenvolvedores compreendam de forma clara como o sistema deve funcionar, garantindo uma **experiência fluida e sem obstáculos**.  

&emsp; No contexto do **Prescript**, o *Wire Flow* permite estruturar a navegação de forma intuitiva para farmacêuticos, tornando o processo de separação de medicamentos mais **seguro, eficiente e rastreável**. Com isso, **a plataforma se torna mais funcional e a taxa de erros no desenvolvimento é reduzida significativamente.**  
