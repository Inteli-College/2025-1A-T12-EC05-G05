---
title: Matriz de risco
sidebar_position: 1
---

# ⚠️ Matriz de risco 

&emsp; A implementação de um sistema automatizado para separação de medicamentos em um ambiente hospitalar exige precisão, confiabilidade e controle rigoroso dos processos. A utilização do Dobot como manipulador robótico traz eficiência à operação, mas também introduz riscos que podem comprometer sua funcionalidade, a segurança dos insumos e a confiabilidade do sistema.

&emsp; Diante disso, foi elaborada a Matriz de Risco, que identifica e classifica os principais riscos do projeto com base no impacto que podem causar e na probabilidade de ocorrência. A matriz abaixo apresenta os riscos mapeados, seguidos de um detalhamento das causas e das estratégias para mitigação.

<img src="../img/matriz-Risco.png" alt="Matriz de risco" />

## 📝 Detalhamento

 **Chance de erro de medicamento**

 &emsp;Os medicamentos podem ser trocados de posição, o que vai fazer com que o robô possa pegar um medicamento errado.
Para sanar esse risco, recomenda-se sempre manter o estoque na mesma posição, para que o dobot consiga identificar os insumos corretamente. 

Impacto: Muito alto / Risco: Médio 

**QrCode virado**

 &emsp;O QRCode inserido nos insumos pode acabar ficando virado, o que vai impedir o robô de realizar o registro dos medicamentos.
Para conter esse risco é necessário sempre realizar uma checagem para verificar a posição dos insumos.

Impacto: Rédio / Risco: Alto

**Erro na autenticação de usuários**

 &emsp;O sistema de login pode falhar ao identificar corretamente o usuário, impedindo o acesso ao sistema. Isso pode ocorrer por falhas na comunicação com o banco de dados, expiração indevida da sessão, erros na criptografia das credenciais ou falhas na validação de permissões.

Para mitigar esse risco, devem ser implementados testes unitários e de integração para validar diferentes cenários de login
 
Impacto: Médio / Risco: Raro

 **Falta de estoque**

  &emsp;O estoque de um dos insumos pode acabar findando, o que impossibilita o robô de pegar o medicamento, atrasando a montagem da fita. Para sanar esse risco, deve-se sempre realizar o estoque dos insumos.
 
 Impacto: Alto / Risco: Baixo

 **Erro da leitura do qrcode.**

 &emsp;O leitor de QRCode/código de barras, pode acabar sendo lido errado, devido a riscos, manchas ou erros de impressão. Para mitigar esse risco, deve-se testar em múltiplos cenários a leitura do QRCode/Código de barras.

 Impacto: Muito Alto / Risco: Raro

**Falha na devolução do medicamento**

&emsp;Quando o medicamento retornar, ele pode não conseguir identificar o bin no qual aqueles medicamentos pertencem, fazendo com que nãoregistre qual paciente devolveu qual insumo.

Para mitigar esse risco realizar confirmação manual pode ser uma posibilidade para garantir a devolução correta dos insumos.

Impacto: Baixo / Risco: Baixo

**Aumento do escopo do projeto**

&emsp; O projeto pode ter seu escopo aumentado além da capacidade de produção dos membros, o que pode gerar queda na qualidade da entrega e frustração dos membros, para mitigar isso, deve-se ter um escopo bem definido levando em conta a capacidade produtiva dos membros.

Impacto: Médio / Risco: Médio

**Baixa capacidade técnica dos colaboradores**

&emsp;O projeto pode necessitar de uma capacidade técnica além do que os membros da equipe possuem, o que por sua vez pode gerar atrasos devido ao tempo de aprendizado dos colaboradores.

Impacto: Baixo / Risco: Raro

## ✅ Conclusão
&emsp;Para garantir o sucesso do projeto, é importante que cada risco seja monitorado e que as medidas de prevensão sejam implementadas desde o início do projeto. O uso de testes automatizados e boas práticas de desenvolvimento é fundamental para reduzir falhas e garantir a qualidade do projeto.