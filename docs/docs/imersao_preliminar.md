---
title: "Imersão Preliminar"
sidebar_position: 2
---

&emsp; Para direcionar um projeto de maneira eficiente, é essencial, antes de tudo, compreender de forma integral o problema, o cenário e o usuário. Por isso, iniciamos com uma pesquisa exploratória e uma pesquisa desk, etapa que chamamos de **Imersão Preliminar**.

## 📝 Pesquisa Exploratória

&emsp; Para a pesquisa exploratória após o recebimento do Tapi, marcamos uma conversa por vídeo com o nosso parceiro de projeto onde junto aos outros grupos pudemos esclarecer algumas dúvidas.

&emsp; Essa pesquisa foi conduzida como uma entrevista de perguntas e respostas, podemos ver todas elas na tabela abaixo:


| **Pergunta** | **Resposta** |
|-------------|-------------|
| Quais as funcionalidades das APIs que vocês já possuem? | Nenhuma, mas eles podem criar novas APIs caso seja necessário. |
| Vamos ter acesso aos dados como tabelas e pedidos? | Sim. Podemos trabalhar com alguns dados, mas os dados sensíveis obviamente serão ocultados. |
| Como é feito o pedido e/ou registro de pedidos hoje em dia? | A prescrição é feita através de uma tela no sistema, que fica conectada direto na farmácia. Esses pedidos são analisados pelo farmacêutico e aprovados ou não. |

<details>
  <summary>🔍 Ver mais...</summary>
  
| **Pergunta** | **Resposta** |
|-------------|-------------|
| Existe um diagrama de como funciona o sistema de vocês? | Sim, eles irão mandar em outro momento (até o momento atual eles não enviaram). |
| Já existe uma fiscalização de psicotrópicos dos pedidos? | Existe uma contagem manual diária. A preocupação é maior quando o item sai da farmácia, pois eles não têm como ter certeza de que o produto de fato foi utilizado no paciente. Querem criar uma forma de rastreabilidade que intitulam como ‘rastreabilidade à beira do leito’, onde a enfermeira leria o coligo do paciente e do remédio ao utilizá-lo. |
| Os remédios do mesmo bin possuem a mesma data de validade? | Idealmente sim, mas às vezes tem um saquinho fechado dentro do bin com remédios de outra validade. |
| Haverá QR codes em todos os comprimidos? | Todos os medicamentos vão ter sempre identificação: código de barra ou QR Code, mas a posição dele não é garantida. |
| Qual o procedimento quando algum medicamento acaba no estoque? | Não existe um controle de estoque, por isso o médico é avisado e o medicamento não é separado. |
| Que tipo de aprovação o farmacêutico faz antes de montar a fita? Ele verifica se ainda há em estoque o medicamento ou outra opção de remédio para substituir? | O farmacêutico faz uma dupla checagem para ver se não pegaram o medicamento errado. O farmacêutico tem que seguir protocolos institucionais; alguns remédios precisam de permissão da CCIH para liberar. O farmacêutico vê se a prescrição está correta no sentido da administração dos remédios. |
| Faz sentido para vocês manter a opção de modo manual? | Sim, pois é comum que, em algumas situações, tenham que pegar um remédio de forma unitária, mas nada impede de pedir para o robô pegar um item de atendimento na porta. Preferem um comando para pegar apenas um remédio, mas uma coisa não exclui a outra. |
| São contados quantos comprimidos e ampolas de cada remédio entram e saem da farmácia? Se sim, com que frequência? | Os psicotrópicos são contados diariamente, os outros remédios não são contados. O ideal do controle de estoque seria ter o saldo e computar a baixa a cada fita/prescrição entregue. |
| Pensando no projeto que vamos desenvolver, qual o principal desafio que vocês enfrentam hoje em dia no processo de recebimento, separação e montagem das fitas de medicamentos? | O principal desafio é a separação, pois demanda muito tempo e atenção. Pode haver erros que comprometam a segurança do paciente e a eficiência do atendimento. |
| A interface do nosso projeto será responsável só pelas etapas de triagem e separação ou ele será utilizado também pelo estoque/almoxarifado e logística dos remédios? | O sistema vai ser usado na farmácia, mas seria legal outros setores terem acesso a alguns dados. |
| O que acontece quando uma fita volta pra farmácia? Qual é o processo utilizado para tratar essas fitas que voltam? | O medicamento volta quando o paciente tem alta ou quando mudou o procedimento de forma repentina. A enfermeira devolve pra farmácia uma vez ao dia e lá eles devolvem no bin, mas isso não é registrado. Muitas vezes nem sabem de que paciente aquele medicamento voltou. Um grande problema é que as enfermeiras juntam os medicamentos em uma única fita e não identificam as fitas retornadas. |
| Como a equipe da farmácia sabe quando o estoque está acabando? | No olho, totalmente manual. |
| Quais são as funções de cada pessoa no processo? Por exemplo, o que faz o farmacêutico? E o enfermeiro? | Enfermagem não faz parte do processo. O desenvolvimento ocorre dentro da farmácia onde só tem farmacêuticos e técnicos. O farmacêutico recebe a prescrição pronta que o médico enviou, vê se os medicamentos foram prescritos corretamente (triagem da prescrição), e o técnico também ajuda no processo. A separação é a segunda etapa; o técnico de farmácia lista liberada na triagem, pega os medicamentos e coloca em uma bandeja (separada por paciente). Terminada a separação, bipam e selam as fitas, prescrição por prescrição. No final, entregam o saquinho na enfermaria. |
| Em relação à rastreabilidade, entendemos que o que vocês pediram é que o sistema seja capaz de armazenar quais medicamentos um determinado paciente consumiu. Isso está correto? | Rastreabilidade carrega a identidade do medicamento no registro. Adicionar os dados do medicamento para o paciente (lote, quantidade, validade, etc.). Esses dados estão na etiqueta do medicamento (QR Code, barra). Saber também quem vendeu o medicamento para o hospital. O fabricante é um dado importante.  Outro ponto importante: as fitas são montadas em apenas um momento do dia. Ou seja, existe um acúmulo de pedidos e depois esses pedidos são montados de uma vez e entregues de uma vez também, exceto pedidos de emergência.|
| A ideia é que a receita (prescrição) seja adicionada diretamente no sistema que estamos desenvolvendo ou ela apenas será recebida? | Eles já possuem um sistema para que o médico faça as receitas. |
| Há algum passo muito importante que pode ter ficado implícito quando se trata desse processo de triagem, separação e conferência? | Escalonamento futuro do projeto piloto: a farmácia é grande e o tempo de locomoção até todos os medicamentos também é significativo. O protótipo precisa levar em conta uma maior mobilidade. Há também pesos de diferentes medicamentos e a localização (por estarem longe um do outro). É preciso ter um modo de distinção visual, com o nome do medicamento, para não haver erro de identificação. Em um outro mundo, o ideal seria o projeto poder distinguir diferentes remédios misturados. Não é preciso fazer isso, mas seria legal o projeto ser modular para escalonar isso. |
| Ainda com base no processo da triagem, seria possível enviar para a gente um vídeo da tela do computador realizando os procedimentos? | Ela vai mandar uns prints das telas futuramente (ainda não enviado). |
| Quais seriam informações que não poderiam faltar para construirmos nosso banco de dados? | código de produto (CHC). Lembrando que o mesmo remédio com doses diferentes possuem códigos diferentes. Informações do Paciente: nome, leito, HC... |
| Seria interessante para vocês se incluíssemos um histórico de alergias ou doenças ligadas a cada paciente? | O sistema deles possui essa ferramenta, mas dependem do médico ou do enfermeiro para fazer o registro de alergias do paciente. |
| Como é registrada essa “dose unitária” de remédios? Tem alguma logística específica com marcas diferentes dos mesmos remédios? | Os remédios são registrados sempre pelo nome do princípio ativo, sem distinção de marca. |

</details>


&emsp; A fase de pesquisa exploratória permitiu identificar os principais desafios enfrentados na separação e montagem das fitas de medicação. O processo atual demanda tempo e atenção dos farmacêuticos, tornando evidente a necessidade de uma solução automatizada. Além disso, a falta de rastreabilidade e controle de estoque são pontos críticos que podem ser melhorados. Com essas informações, podemos direcionar o desenvolvimento do robô para otimizar a separação dos medicamentos, reduzir erros e aumentar a eficiência do atendimento.

&emsp; Após entendermos as necessidades dos stakeholders e como o HC funciona, buscamos descobrir formas de tornar esse projeto viável da melhor maneira. Por esse motivo, realizamos outra etapa de pesquisa conhecida como **Desk Research**, onde coletamos e analisamos informações já existentes sobre soluções e necessidades similares.

## 🖥️ Desk Research

&emsp;  Nessa fase, pesquisamos farmácias automatizadas, hospitais que operam com sistemas semelhantes e empresas que produzem essas soluções. Conseguimos levantar algumas informações muito relevantes:

* **Sistemas e máquinas já existentes:** Atualmente, existem poucas empresas que fornecem essa solução. As que fornecem fazem com alta qualidade, mas os equipamentos são extremamente caros, principalmente porque são produtos importados.

* **Relato dos farmacêuticos:** Todos os farmacêuticos relataram alívio, pois um processo repetitivo e suscetível a falhas humanas foi automatizado, reduzindo erros.

* **Beneficiados colaterais:** Pacientes e enfermeiros são os maiores beneficiados, pois os kits de medicamentos ficam prontos mais rápido e com maior eficiência.

* **Preocupações:** As principais preocupações eram em relação a demissões e custos. A primeira preocupação foi descartada, pois os farmacêuticos continuam com um extenso trabalho e não houve redução significativa de funcionários. Em relação aos custos, o investimento inicial é alto, mas os benefícios a longo prazo são significativos, principalmente devido à redução de erros na separação.

&emsp; Com a conclusão da fase de **Imersão Preliminar**, conseguimos identificar os desafios, necessidades, oportunidades e pessoas mais afetadas no processo de separação e montagem das fitas de medicação. Essa pesquisa nos permitiu validar que a automação pode trazer melhorias significativas, garantindo maior eficiência e segurança. Agora, com todas essas informações, podemos avançar para as próximas etapas e demandas do desenvolvimento deste projeto.

## ⛲Fontes e Referências
https://www.youtube.com/watch?v=Azu1uGIJiwE
https://panoramafarmaceutico.com.br/robo-na-farmacia-amplia-faturamento/
https://rowa.de/br/
https://sisnacmed.com.br/robo-para-farmacia-hospitalar/
https://engeclinic.com/pillpick/
https://www.omnicell.com/resources/video/central-med-automation-service/
https://www.willach-pharmacy-solutions.com/EN/






