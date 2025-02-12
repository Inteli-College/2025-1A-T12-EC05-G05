---
title: Matriz de risco
sidebar_position: 1
---

# ⚠️ Matriz de risco 

&emsp; A implementação de um sistema automatizado para separação de medicamentos em um ambiente hospitalar exige precisão, confiabilidade e controle rigoroso dos processos. A utilização do Dobot como manipulador robótico traz eficiência à operação, mas também introduz riscos que podem comprometer sua funcionalidade, a segurança dos insumos e a confiabilidade do sistema.

&emsp; Diante disso, foi elaborada a Matriz de Risco, que identifica e classifica os principais riscos do projeto com base no impacto que podem causar e na probabilidade de ocorrência. A matriz abaixo apresenta os riscos mapeados, seguidos de um detalhamento das causas e das estratégias para mitigação.

<img src="../img/matriz-Risco.png" alt="Matriz de risco" />

## 📝 Detalhamento

 <p>**Chance de erro de medicamento**</p>
 &emsp;Os medicamentos podem ser trocados de posição, o que vai fazer com que o robô possa pegar um medicamento errado.
<p>Para sanar esse risco, recomenda-se sempre manter o estoque na mesma posição, para que o dobot consiga identificar os insumos corretamente. </p>
<p>Impacto: Muito Alto / risco: médio </p>

<p>**QrCode virado**</p>
 &emsp;O QRCode inserido nos insumos pode acabar ficando virado, o que vai impedir o robô de realizar o registro dos medicamentos.
<p>Para conter esse risco é necessário sempre realizar uma checagem para verificar a posição dos insumos.</p>

<p>Impacto:médio /risco: alto</p>

<p>**Bug no login**</p>

&emsp;O login pode acabar não identificando o usuário devido a um bug dentro do código. Para corrigir esse risco, deve-se realizar testes unitários para garantir o funcionamento dessa feature.
 
<p>Impacto: médio/risco: raro</p>

 <p>**Falta de estoque**</p>
 O estoque de um dos insumos pode acabar findando, o que impossibilita o robô de pegar o medicamento, atrasando a montagem da fita. Para sanar esse risco, deve-se sempre realizar o estoque dos insumos.
 <p>Impacto: alto /risco: baixo</p>

 <p>**Erro da leitura do qrcode.**</p>
 &emsp;O leitor de QRCode/código de barras, pode acabar sendo lido errado, devido a riscos, manchas ou erros de impressão. Para mitigar esse risco, deve-se testar em múltiplos cenários a leitura do QRCode/Código de barras.
 <p>Impacto: muito alto /risco: raro</p>

<p>**Falha na devolução do medicamento**</p>
 &emsp;Quando o medicamento retornar, ele pode não conseguir identificar o bin no qual aqueles medicamentos pertencem, fazendo com que nãoregistre qual paciente devolveu qual insumo.
Para mitigar esse risco, o sistema deve registrar automaticamente todas as tentativas de devolução e exigir uma confirmação manual ou via sensor antes de considerar o medicamento disponível novamente no estoque.
<p> Impacto: baixo /risco: baixo</p>

<p>**Aumento do escopo do projeto**</p>
&emsp; O projeto pode ter seu escopo aumentado além da capacidade de produção dos membros, o que pode gerar queda na qualidade da entrega e frustração dos membros, para mitigar isso, deve-se ter um escopo bem definido levando em conta a capacidade produtiva dos membros .
<p>Impacto: médio /risco: médio</p>

<p>**Baixa capacidade técnica dos colaboradores**</p>
&emsp;O projeto pode necessitar de uma capacidade técnica além do que os membros da equipe possuem, o que por sua vez pode gerar atrasos devido ao tempo de aprendizado dos colaboradores.
<p>Impacto: baixo /risco: raro</p>

## ✅ Conclusão
&emsp;Para garantir o sucesso do projeto, é importante que cada risco seja monitorado e que as medidas de prevensão sejam implementadas desde o início do projeto. O uso de testes automatizados e boas práticas de desenvolvimento é fundamental para reduzir falhas e garantir a qualidade do projeto.