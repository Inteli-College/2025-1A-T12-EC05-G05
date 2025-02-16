---
title: Requisitos funcionais
sidebar_position: 1
---

# ⚙️ Requisitos Funcionais

&emsp; Os requisitos funcionais descrevem **as funcionalidades e serviços essenciais** do sistema. Eles determinam **o que o software deve ser capaz de fazer** para atender às demandas do negócio e dos usuários.

&emsp; Estes requisitos detalham as **entradas**, os **processos internos** e as **saídas esperadas**.

## 📋 Lista de Requisitos Funcionais

| RF#  | Descrição | Regra de Negócio |
|------|-----------|------------------|
| RF01 | Deve haver um mecanismo para validar se o robô realizou a retirada correta do medicamento. | A verificação deve garantir que o medicamento foi devidamente coletado pelo robô, prevenindo registros incorretos e assegurando a exatidão do controle de estoque. |
| RF02 | Antes da retirada, a validade do medicamento precisa ser conferida. | Medicamentos vencidos não podem ser disponibilizados para uso, garantindo a segurança do paciente e o correto gerenciamento do estoque. |
| RF03 | A correspondência entre o medicamento retirado e o cadastrado no bin deve ser confirmada. | Essa conferência evita falhas na distribuição, garantindo que o medicamento correto seja entregue ao usuário final. |

<details class="ver-mais">
  <summary>🔍 Ver mais requisitos</summary>

| RF#  | Descrição | Regra de Negócio |
|------|-----------|------------------|
| RF04 | A relação entre o QR Code e a fita de medicação correspondente deve ser registrada. | O vínculo do QR Code com a fita possibilita a rastreabilidade dos medicamentos, facilitando o controle e o processo de devolução. |
| RF05 | O sistema precisa interpretar o QR Code do medicamento para orientar onde ele deve ser armazenado. | A leitura do QR Code direciona o medicamento para o local adequado, otimizando a organização do estoque. |
| RF06 | Deve existir um processo para permitir a devolução controlada da fita médica. | A devolução deve ser registrada, identificando quais medicamentos foram utilizados e quais permanecem disponíveis, permitindo um controle eficiente do estoque. |
| RF07 | O histórico de uso das fitas deve ser armazenado com informações sobre criação e devoluções realizadas. | O histórico deve estar acessível para auditoria e rastreamento, garantindo maior controle e transparência no processo. |
| RF08 | O sistema deve emitir alertas quando o estoque atingir um nível crítico. | A notificação deve ser gerada automaticamente ao atingir um limite mínimo, permitindo a reposição antecipada de medicamentos. |
| RF09 | A atualização das informações do estoque, incluindo quantidades e prazos de validade dos bins, deve ser automatizada. | A atualização das informações deve ser feita de forma contínua, garantindo precisão e confiabilidade nos registros de estoque. |
| RF10 | Deve haver uma funcionalidade para substituir um medicamento na fita médica quando necessário. | Caso seja necessária a troca de um medicamento na fita, o sistema deve permitir a substituição de maneira controlada, garantindo rastreabilidade e atualização correta dos registros. |
| RF11 | Todas as requisições de medicamentos devem ser exibidas de maneira organizada. | As solicitações, sejam pendentes ou aprovadas, precisam estar disponíveis para consulta pelos usuários responsáveis. |
| RF12 | As requisições pendentes para aprovação devem ser exibidas separadamente. | As solicitações que aguardam aprovação devem ser destacadas para facilitar a gestão e a tomada de decisão. |
| RF13 | Deve haver um meio para que prescrições aprovadas sejam encaminhadas para produção. | Após a aprovação, o farmacêutico deve poder solicitar a produção da fita médica correspondente. |
| RF14 | Um mecanismo de login deve ser implementado para garantir a identificação dos usuários. | O login precisa assegurar a rastreabilidade das ações dentro do sistema, associando cada atividade a um usuário específico. |
| RF15 | O sistema precisa emitir notificações quando a data de validade dos bins estiver próxima do vencimento. | O alerta deve ser emitido automaticamente para permitir ações preventivas e evitar o uso de medicamentos vencidos. |


</details>

## ✅ Conclusão

&emsp; A definição clara dos requisitos funcionais garante que o sistema tenha **todas as funcionalidades necessárias** para atender aos usuários.  

&emsp; A correta implementação dos requisitos funcionais reduz falhas e melhora a experiência geral com o sistema. Eles devem ser continuamente revisados para garantir que estejam alinhados com os objetivos do projeto.
