---
title: Requisitos Funcionais
sidebar_position: 1
---

# ⚙️ Requisitos Funcionais

&emsp; Os requisitos funcionais descrevem **as funcionalidades e serviços essenciais** do sistema. Eles determinam **o que o software deve ser capaz de fazer** para atender às demandas do negócio e dos usuários.

&emsp; Estes requisitos detalham as **entradas**, os **processos internos** e as **saídas esperadas**.

## 📋 Lista de Requisitos Funcionais

| RF#  | Descrição | Regra de Negócio |
|------|-----------|------------------|
| RF01 | Deve haver um mecanismo para validar se o robô realizou a retirada correta do medicamento. | A verificação deve garantir que o medicamento foi devidamente coletado pelo robô, prevenindo registros incorretos e assegurando a exatidão do controle de estoque. |
| RF02 | A correspondência entre o medicamento retirado e o cadastrado no bin deve ser confirmada. | Essa conferência evita falhas na distribuição, garantindo que o medicamento correto seja entregue ao usuário final. |
| RF03 | A relação entre o QR Code e a fita de medicação correspondente deve ser registrada. | O vínculo do QR Code com a fita possibilita a rastreabilidade dos medicamentos, facilitando o controle. |

<details class="ver-mais">
  <summary>🔍 Ver mais requisitos</summary>

| RF#  | Descrição | Regra de Negócio |
|------|-----------|------------------|
| RF04 | O sistema precisa interpretar o QR Code do medicamento para orientar onde ele deve ser armazenado. | A leitura do QR Code direciona o medicamento para o local adequado, otimizando a organização do estoque. |
| RF05 | O histórico de uso das fitas deve ser armazenado com informações sobre criação e devoluções realizadas. | O histórico deve estar acessível para auditoria e rastreamento, garantindo maior controle e transparência no processo. |
| RF06 | A atualização das informações do estoque, incluindo quantidades e prazos de validade dos bins, deve ser automatizada. | A atualização das informações deve ser feita de forma contínua, garantindo precisão e confiabilidade nos registros de estoque. |
| RF07 | Todas as requisições de medicamentos devem ser exibidas de maneira organizada. | As solicitações, sejam pendentes ou aprovadas, precisam estar disponíveis para consulta pelos usuários responsáveis. |
| RF08 | As requisições pendentes para serem produzidas devem ser exibidas separadamente. | As solicitações que aguardam aprovação devem ser destacadas para facilitar a gestão e a tomada de decisão. |
| RF09 | Deve haver um meio para que prescrições aprovadas sejam encaminhadas para produção. | Após a aprovação, o farmacêutico deve poder solicitar a produção da fita médica correspondente. |
| RF10 | Um mecanismo de login deve ser implementado para garantir a identificação dos usuários. | O login precisa assegurar a rastreabilidade das ações dentro do sistema, associando cada atividade a um usuário específico. | 
| RF11 | Deve-se implementar o método hash nas senhas ao armazená-las no banco de dados. | As senhas devem ser armazenadas de forma segura utilizando um algoritmo de hash forte. O sistema nunca deve armazenar senhas em texto plano, garantindo a proteção contra acessos não autorizados. | 

</details>

## ✅ Conclusão

&emsp; A definição clara dos requisitos funcionais garante que o sistema tenha **todas as funcionalidades necessárias** para atender aos usuários.  

&emsp; A correta implementação dos requisitos funcionais reduz falhas e melhora a experiência geral com o sistema. Eles devem ser continuamente revisados para garantir que estejam alinhados com os objetivos do projeto.
