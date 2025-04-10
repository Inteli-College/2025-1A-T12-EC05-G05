---
title: "💵 Análise Financeria do Projeto"
sidebar_label: "Análise Financeria do Projeto"
sidebar_position: 12
---

## Escopo Educacional e Visão de Escalabilidade
&emsp;Antes de avaliar a viabilidade econômica da solução, é importante compreender em que contexto ela foi desenvolvida e como pode ser expandida. Esta seção diferencia o escopo atual — com foco educacional e prototipagem — da visão futura voltada à adoção em ambiente hospitalar real, com demandas industriais e regulatórias.


### Escopo Educacional
&emsp;O projeto Prescript foi desenvolvido em nível educacional, com foco na construção de um Produto Mínimo Viável (MVP), utilizando componentes acessíveis e não industriais. O objetivo é validar o funcionamento do conceito em pequena escala, com base em tecnologias que permitem fácil aprendizado e desenvolvimento.

### Visão de Escalabilidade Industrial
&emsp;Para uma futura implementação em nível industrial, os componentes devem ser substituídos por alternativas certificadas e de alta durabilidade, garantindo conformidade com normas técnicas e sanitárias. Além disso, o sistema poderá ser integrado a prontuários eletrônicos e sistemas de gestão hospitalar.


## Categorização de custos 
&emsp;Nesta seção, são apresentados os principais tipos de custos envolvidos em um desenvolvimento do projeto, divididos em diretos e indiretos, para facilitar a compreensão financeira da solução.

### Custos Diretos
&emsp;Os custos diretos são todos os gastos que podem ser diretamente atribuídos ao desenvolvimento e operação do produto ou serviço. Eles são facilmente identificáveis e mensuráveis, pois estão diretamente relacionados aos recursos utilizados para a produção do sistema.     
&emsp;No contexto deste projeto, os custos diretos envolvem os materiais e componentes físicos empregados na construção do protótipo, como o braço robótico, o leitor de QR Code, o sensor infravermelho, o Raspberry Pi e demais itens essenciais para o funcionamento do sistema. Cada um desses elementos tem um vínculo direto com a funcionalidade do produto final, e sem eles, o sistema não seria capaz de operar.


### Componentes do Protótipo Educacional


| Componentes          | Especificação                      | Valor (R$)         |
|--------------------- |------------------------------------|--------------------|
| Braço robótico       | Dobot Magician Lite                | R$ 7.025,55        |
| Sensor Infravermelho | TCRT5000                           | R$ 6,30            |
| Leitor de QR Code    | MH-ET Live Scanner V3.0            | R$ 260,00          |
| Minicomputador       | Raspberry Pi 5 - 8GB RAM           | R$ 1200,00         |
| Componentes diversos | Cabos, suportes, fontes de energia | R$ 200,00          |
| **Total**            |                                    |  **R$ 8.191,85**   |


### Estimativa de Custos para Escopo Industrial

&emsp;Nesta versão industrial do projeto, os componentes foram substituídos por versões industriais. Além disso, foi incluída uma base móvel autônoma (esteira motorizada) que permite ao braço robótico se locomover pelos corredores da farmácia hospitalar, ampliando a cobertura da solução e eliminando a necessidade de múltiplos braços em diferentes pontos fixos. Essa mobilidade é essencial em ambientes que exigem flexibilidade e agilidade na dispensação dos medicamentos.

&emsp;Também foi feita uma estimativa de impostos aproximada para cada item com base em alíquotas de importação, IPI, ICMS e PIS/COFINS. Esses valores podem variar conforme o regime tributário da instituição, localização geográfica e se há benefícios fiscais (como isenções para área da saúde). Ainda assim, os números fornecem uma base para estimar os custos totais da implementação industrial.


| Componentes                          | Especificação                    | Valor (R$)        | Imposto Estimado (R$)  |
|--------------------------------------|----------------------------------|-------------------|------------------------|
| Braço robótico industrial            | Universal Robots UR5e            | R$ 25.000,00      | R$ 16.173,78           |
| Sensor Infravermelho industrial      | Omron E3Z-T61                    | R$ 300,00         | R$ 194,09              |
| Leitor de QR Code industrial         | Datalogic Matrix 320             | R$ 2.000,00       | R$ 1.293,90            |
| Integração com prontuário eletrônico | Software/API HIS                 | R$ 10.000,00      | R$ 6.469,51            |
| Suporte técnico anual                | Contrato especializado           | R$ 5.000,00       | R$ 3.234,76            |
| Base móvel autônoma                  | Mobile Industrial Robots MiR250  | R$ 100.000,00     | R$ 64.695,12           |
| **Total estimado**                   |                                  | **R$ 142.300,00** | **R$ 92.061,16**       |

&emsp;A seguir estão links de referências dos componentes principais da tabela.
                                       
&emsp; **Universal Robots UR5e**
- [Braço robótico](https://www.universal-robots.com/products/ur5e/)  
- [Vídeo do braço robótico](https://www.universal-robots.com/)


&emsp; **Sensor Infravermelho Omron E3Z-T61**   
- [Sensor Infravermelho](https://pahcautomacao.com.br/produto/sensor-fotoeletrico-e3z-t61-omron/)

&emsp; **Datalogic Matrix 320 (Leitor QR Code)**    
- [Leitor de QR Code](https://www.datalogic.com/eng/manufacturing-transportation-logistics/stationary-industrial-scanners/matrix-320-pd-895.html)

&emsp; **MiR250 - Base móvel autônoma** 
- [Base móvel para o braço robótico](https://mobile-industrial-robots.com/products/robots/mir250)


### Custos Indiretos
&emsp;Os custos indiretos são aqueles que não podem ser diretamente associados a um único produto ou serviço, mas que são fundamentais para que o projeto possa ser executado e mantido. Eles são menos visíveis que os diretos, e muitas vezes requerem algum tipo de estimativa ou rateio para serem calculados.  
&emsp;Em projetos de desenvolvimento como este, os custos indiretos incluem, por exemplo, energia elétrica consumida pelos equipamentos durante o desenvolvimento e testes, internet utilizada para atualizações e integração do sistema, e até o suporte técnico necessário para resolver problemas ou manter os dispositivos em funcionamento.    
&emsp;Embora esses custos não façam parte diretamente da estrutura do produto final, eles são indispensáveis para a continuidade e estabilidade do sistema.

 
## Análise de Investimentos  
&emsp;A seguir, os investimentos são divididos entre despesas de capital (CAPEX), voltadas à aquisição dos equipamentos e desenvolvimento inicial, e despesas operacionais (OPEX), relacionadas à manutenção e operação contínua do sistema.


### Despesas de Capital (CAPEX)
&emsp;CAPEX (do inglês Capital Expenditure) representa os investimentos em bens de capital, ou seja, aqueles gastos voltados para a aquisição de ativos físicos ou o desenvolvimento de sistemas que terão uma vida útil prolongada.           
&emsp;E no caso deste projeto, o CAPEX compreende a compra dos componentes eletrônicos, o braço robótico, o minicomputador, o leitor de QR Code, e o desenvolvimento da plataforma web. Todos esses itens constituem a base do sistema e permanecerão sendo utilizados ao longo do tempo.   


### Despesas Operacionais (OPEX)
&emsp;OPEX (do inglês Operational Expenditure) refere-se às despesas operacionais recorrentes, ou seja, todos os gastos necessários para manter o sistema funcionando após sua implementação.   
&emsp;Diferente do CAPEX, que trata de investimentos pontuais, o OPEX cobre os custos contínuos com manutenção, atualizações, treinamento, suporte técnico, hospedagem de servidores, e qualquer outro recurso que precise ser renovado ou mantido com frequência.  
&emsp;No contexto deste projeto, o OPEX incluiria os custos com manutenção preventiva dos equipamentos, suporte técnico contínuo, e o treinamento da equipe farmacêutica para operar o sistema. São valores menores do que os investimentos de capital, mas que ocorrem periodicamente, sendo essenciais para a sustentabilidade do sistema no médio e longo prazo.


## Receita e Lucro
&emsp;A receita representa os ganhos gerados a partir do uso da solução, seja por economia de custos, aumento de produtividade ou redução de perdas. Em um projeto como este, onde o sistema automatiza uma atividade que antes era manual, a receita pode ser interpretada como o valor economizado com mão de obra, tempo e desperdícios.     
&emsp;O lucro, por sua vez, é o valor restante após a dedução dos custos operacionais (OPEX + custos indiretos) da receita obtida. Um projeto rentável é aquele que gera receita suficiente para cobrir os custos e ainda deixar um valor excedente, o lucro. 

### Como calcular a margem de lucro de um serviço?
&emsp;Para calcular a margem de lucro de um serviço, começamos identificando o lucro bruto, que é a diferença entre a receita total e os custos diretos.    
&emsp;Em seguida, dividimos esse lucro bruto pela receita total e multiplicamos o resultado por 100, obtendo assim a margem em percentual.

- **Fórmula:**
Margem de Lucro (%) = (Lucro Bruto / Receita total) x 100

&emsp;Esse indicador é essencial para avaliar a viabilidade econômica da solução proposta, especialmente em sua possível aplicação industrial. A automação do processo pode aumentar significativamente essa margem ao reduzir custos operacionais e aumentar a eficiência.


## Conclusão
&emsp;A análise financeira realizada permite compreender com mais clareza a estrutura de custos envolvida no desenvolvimento do projeto Prescript, tanto em seu formato educacional quanto em uma possível aplicação industrial. A distinção entre custos diretos e indiretos, bem como entre despesas de capital (CAPEX) e operacionais (OPEX), fornece uma base sólida para o planejamento e a tomada de decisão em fases futuras do projeto.     
&emsp;Além disso, a projeção de custos para um ambiente industrial ajuda a antecipar os investimentos necessários para adequação do sistema às exigências técnicas e regulatórias de um hospital, permitindo desde já uma visão estratégica de longo prazo. Com isso, o projeto avança não apenas como uma solução técnica, mas também na analise financeira da aplicação.


