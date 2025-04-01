---
title: Back-end
sidebar_label: Back-end
sidebar_position: 7
---

# 💻 Back-end

## 🔍 O que é?

&emsp;O back-end do **Prescript** centraliza a lógica de negócio da aplicação, sendo o responsável por processar e servir os dados consumidos tanto pela interface web quanto pelo robô de separação. Ele opera como ponte entre o banco de dados e os demais módulos, garantindo que as informações estejam atualizadas, bem organizadas e acessíveis de forma segura.

---

## 🧩 Estrutura das Rotas

Durante a sprint, foram desenvolvidas e integradas diversas rotas fundamentais para o funcionamento do sistema, divididas em blocos principais:

### 📦 Fitas de Medicamentos

Essas rotas estão diretamente ligadas ao fluxo de separação:

- **Obter Fita (completa):**
  ```http
  GET /fita/:id
  ```
  Retorna todas as informações da fita, incluindo paciente, enfermeiro, data, status e medicamentos. Essa rota é utilizada, por exemplo, no *pop-up* de separação unitária na interface.

- **Resumo da Fita:**
  ```http
  GET /fita/:id/resumo
  ```
  Retorna apenas os campos essenciais para o robô realizar a coleta: `id_fita` e lista de medicamentos.

- **Atualizar Status da Fita:**
  ```http
  PUT /fita/:id/status
  Body:
  {
    "status": "em progresso"
  }
  ```
  Permite atualizar o status da fita entre os estados: *a seguir*, *em progresso* e *pronta*.

---

### 📑 Logs e Histórico

Essas rotas servem para alimentar a interface com dados gerados pelas ações no sistema:

- **Obter Histórico de Fitas:**
  ```http
  GET /api/historico
  ```
  Retorna todas as fitas que já passaram pelo sistema, permitindo filtragem por período e exportação.

- **Obter Logs do Sistema:**
  ```http
  GET /api/logs
  ```
  Retorna os registros de ações do sistema (movimentações do robô, operações realizadas, interações com a interface etc.), exibidos diretamente na tela de *Logs* da plataforma.

---

## 🔁 Fluxo de Comunicação

O back-end recebe e responde requisições do:

- **Front-end (React.js):** exibindo dados nas telas da plataforma (home, histórico, logs, card da fita, pop-ups...).
- **Robô (via CLI):** consumindo rotas como `/fita/:id/resumo` para executar a separação com base na prescrição médica.

---

## ✅ Conclusão

&emsp;Com essa estrutura de rotas bem definida, o back-end do Prescript se torna a base de sustentação para uma experiência fluida, rastreável e segura dentro da farmácia hospitalar. As informações sobre medicamentos, prescrições e movimentações são manipuladas dinamicamente, mantendo o sistema sempre atualizado e pronto para interações tanto do farmacêutico quanto da automação.
