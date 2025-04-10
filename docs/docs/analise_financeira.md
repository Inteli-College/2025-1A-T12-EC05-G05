---
title: "💵 Análise Financeira do Projeto"
sidebar_label: "Análise Financeira do Projeto"
sidebar_position: 12
---

##  🎯 Escopo Educacional e Visão de Escalabilidade
&emsp;Antes de avaliar a viabilidade econômica da solução, é importante compreender em que contexto ela foi desenvolvida e como pode ser expandida. Esta seção diferencia o escopo atual — com foco educacional e prototipagem — da visão futura voltada à adoção em ambiente hospitalar real, com demandas industriais e regulatórias.


### 📘 Escopo Educacional
&emsp;O projeto Prescript foi desenvolvido em nível educacional, com foco na construção de um Produto Mínimo Viável (MVP), utilizando componentes acessíveis e não industriais. O objetivo é validar o funcionamento do conceito em pequena escala, com base em tecnologias que permitem fácil aprendizado e desenvolvimento.

### 📘 Visão de Escalabilidade Industrial
&emsp;Para uma futura implementação em nível industrial, os componentes devem ser substituídos por alternativas certificadas e de alta durabilidade, garantindo conformidade com normas técnicas e sanitárias. Além disso, o sistema poderá ser integrado a prontuários eletrônicos e sistemas de gestão hospitalar.


## 📊 Categorização de custos 
&emsp;Nesta seção, são apresentados os principais tipos de custos envolvidos em um desenvolvimento do projeto, divididos em diretos e indiretos, para facilitar a compreensão financeira da solução.

### 💸 Custos Diretos
&emsp;Os custos diretos são todos os gastos que podem ser diretamente atribuídos ao desenvolvimento e operação do produto ou serviço. Eles são facilmente identificáveis e mensuráveis, pois estão diretamente relacionados aos recursos utilizados para a produção do sistema.     
&emsp;No contexto deste projeto, os custos diretos envolvem os materiais e componentes físicos empregados na construção do protótipo, como o braço robótico, o leitor de QR Code, o sensor infravermelho, o Raspberry Pi e demais itens essenciais para o funcionamento do sistema. Cada um desses elementos tem um vínculo direto com a funcionalidade do produto final, e sem eles, o sistema não seria capaz de operar.


### 🔍 Componentes do Protótipo Educacional
&emsp;Abaixo está a tabela com valores médios dos principais componentes utilizados no projeto, que seriam os custos diretos.


| Componentes          | Especificação                      | Valor (R$)         |
|--------------------- |------------------------------------|--------------------|
| Braço robótico       | Dobot Magician Lite                | R$ 12.000,00        |
| Sensor Infravermelho | TCRT5000                           | R$ 6,30            |
| Leitor de QR Code    | MH-ET Live Scanner V3.0            | R$ 260,00          |
| Minicomputador       | Raspberry Pi 5 - 8GB RAM           | R$ 1200,00         |
| **Total**            |                                    |  **R$ 13.466,85**   |


### 🔍 Estimativa de Custos para Escopo Industrial

&emsp;Nesta versão industrial do projeto, os componentes foram substituídos por versões industriais. Além disso, foi incluída uma base móvel autônoma (esteira motorizada) que permite ao braço robótico se locomover pelos corredores da farmácia hospitalar, ampliando a cobertura da solução e eliminando a necessidade de múltiplos braços em diferentes pontos fixos. Essa mobilidade é essencial em ambientes que exigem flexibilidade e agilidade na dispensação dos medicamentos.

&emsp;Também foi feita uma estimativa de impostos aproximada para cada item com base em alíquotas de importação, IPI, ICMS e PIS/COFINS. Esses valores podem variar conforme o regime tributário da instituição, localização geográfica e se há benefícios fiscais (como isenções para área da saúde). Ainda assim, os números fornecem uma base para estimar os custos totais da implementação industrial.


| Componentes                          | Especificação                    | Valor (R$)        | Imposto Estimado (R$)  |
|--------------------------------------|----------------------------------|-------------------|------------------------|
| Braço robótico industrial            | Universal Robots UR5e            | R$ 226.341,70     | R$ 146.670,69          |
| Sensor Infravermelho industrial      | Omron E3Z-T61                    | R$ 300,00         | R$ 194,09              |
| Leitor de QR Code industrial         | Datalogic Matrix 320             | R$ 2.000,00       | R$ 1.293,90            |
| Base móvel autônoma                  | Mobile Industrial Robots MiR250  | R$ 100.000,00     | R$ 64.695,12           |
| **Total estimado**                   |                                  | **R$ 328.641,00** | **R$ 212.853,80**       |

&emsp;A seguir estão links de referências dos componentes principais da tabela acima.
                                       
&emsp; **Universal Robots UR5e**
- [Braço robótico](https://www.universal-robots.com/products/ur5e/)  
- [Vídeo do braço robótico](https://www.universal-robots.com/)  
- [Valor do Braço Robótico](https://vention.io/parts/universal-robots-ur5e-collaborative-robot-arm-2445?srsltid=AfmBOoqqSRVA3UH5q0PNbsDYoBRl75ikFTt6hp5Tqtypah9oolz29HAU)

&emsp; **Sensor Infravermelho Omron E3Z-T61**   
- [Sensor Infravermelho](https://pahcautomacao.com.br/produto/sensor-fotoeletrico-e3z-t61-omron/)

&emsp; **Datalogic Matrix 320 (Leitor QR Code)**    
- [Leitor de QR Code](https://www.datalogic.com/eng/manufacturing-transportation-logistics/stationary-industrial-scanners/matrix-320-pd-895.html)

&emsp; **MiR250 - Base móvel autônoma** 
- [Base móvel para o braço robótico](https://mobile-industrial-robots.com/products/robots/mir250)


### 💸 Custos Indiretos
&emsp;Os custos indiretos são aqueles que não podem ser diretamente associados a um único produto ou serviço, mas que são fundamentais para que o projeto possa ser executado e mantido. Eles são menos visíveis que os diretos, e muitas vezes requerem algum tipo de estimativa ou rateio para serem calculados.  
&emsp;Em projetos de desenvolvimento como este, os custos indiretos incluem, por exemplo, energia elétrica consumida pelos equipamentos durante o desenvolvimento e testes, internet utilizada para atualizações e integração do sistema, e até o suporte técnico necessário para resolver problemas ou manter os dispositivos em funcionamento.    
&emsp;Embora esses custos não façam parte diretamente da estrutura do produto final, eles são indispensáveis para a continuidade e estabilidade do sistema.

 
## 📈 Análise de Investimentos do Cenário Industrial
&emsp;A seguir, os investimentos são divididos entre despesas de capital (CAPEX), voltadas à aquisição dos equipamentos e desenvolvimento inicial, e despesas operacionais (OPEX), relacionadas à manutenção e operação contínua do sistema.


### 🛠️ Despesas de Capital (CAPEX)
&emsp;CAPEX (do inglês Capital Expenditure) representa os investimentos em bens de capital, ou seja, aqueles gastos voltados para a aquisição de ativos físicos ou o desenvolvimento de sistemas que terão uma vida útil prolongada.                
&emsp;E no caso deste projeto, o CAPEX compreende a compra dos componentes eletrônicos, o braço robótico, o minicomputador, o leitor de QR Code, o desenvolvimento da plataforma web, e os custos com a equipe técnica envolvida no desenvolvimento.        
&emsp;Considerando um grupo de 7 profissionais com dedicação integral ao longo de **12 meses**, e um salário médio de R$ 7.200 por mês, o custo total com mão de obra para o desenvolvimento do projeto é estimado em **R$ 604.800,00**. 

| Tipo de Investimento                         | Valor (R$)         |
|---------------------------------------------|--------------------|
| Equipamentos Industriais                    | R$ 328.641,70      |
| Impostos sobre Equipamentos                 | R$ 212.853,80      |
| Mão de obra técnica (12 meses, 7 pessoas)   | R$ 588.000,00      |
| **Total CAPEX**                             | **R$ 1.129.495,50**|


### 🛠️ Despesas Operacionais (OPEX)
&emsp;OPEX (do inglês Operational Expenditure) refere-se às despesas operacionais recorrentes, ou seja, todos os gastos necessários para manter o sistema funcionando após sua implementação. Diferente do CAPEX, que trata de investimentos pontuais durante o desenvolvimento, o OPEX cobre os custos contínuos com manutenção, atualizações, suporte técnico, hospedagem de servidores, entre outros.      
&emsp;No contexto deste projeto, os custos operacionais não são vinculados ao período de desenvolvimento, mas sim à fase posterior de operação. Por esse motivo, os valores a seguir são apresentados de forma unitária, sem associação direta a um intervalo de tempo, já que esses custos podem variar conforme a frequência de uso, regime de manutenção e escala de implantação.

| Categoria                      | Estimativa Mensal (R$) 
|-------------------------------|------------------------|
| Manutenção preventiva         | R$ 1.200,00            |
| Suporte técnico e atualizações| R$ 1.000,00            |
| Hospedagem e servidores       | R$ 400,00              | 
| **Total OPEX**                | **R$ 2.600,00**        | 
 

## 💰 Receita e Lucro
&emsp;A receita representa os ganhos gerados a partir do uso da solução, seja por economia de custos, aumento de produtividade ou redução de perdas. Em um projeto como este, onde o sistema automatiza uma atividade que antes era manual, a receita pode ser interpretada como o valor economizado com mão de obra, tempo e desperdícios.       
&emsp;O lucro, por sua vez, é o valor restante após a dedução dos custos operacionais (OPEX + custos indiretos) da receita obtida. Um projeto rentável é aquele que gera receita suficiente para cobrir os custos e ainda deixar um valor excedente, o lucro. 

### 📐 Como calcular a margem de lucro de um serviço?
&emsp;Para calcular a margem de lucro de um serviço, começamos identificando o lucro bruto, que é a diferença entre a receita total e os custos diretos.    
&emsp;Em seguida, dividimos esse lucro bruto pela receita total e multiplicamos o resultado por 100, obtendo assim a margem em percentual.

- **Fórmula:**
Margem de Lucro (%) = (Lucro Bruto / Receita total) x 100

&emsp;Esse indicador é essencial para avaliar a viabilidade econômica da solução proposta, especialmente em sua possível aplicação industrial. A automação do processo pode aumentar significativamente essa margem ao reduzir custos operacionais e aumentar a eficiência.


## ✅ Conclusão
&emsp;A análise financeira realizada permite compreender com mais clareza a estrutura de custos envolvida no desenvolvimento do projeto Prescript, tanto em seu formato educacional quanto em uma possível aplicação industrial.        
&emsp;No cenário educacional, voltado à prototipagem e aprendizado, os custos foram limitados à compra de componentes acessíveis, totalizando cerca de R$ 13.466,85 (detalhados na seção de "Componentes do Protótipo Educacional").    
&emsp;Já no cenário industrial, a projeção considera a substituição dos componentes por versões certificadas, além da inclusão de impostos, mão de obra técnica e despesas operacionais. O custo total estimado para 12 meses de implementação inclui:

- CAPEX (aquisição + desenvolvimento): R$ 1.129.495,50  

- OPEX (manutenção e operação): R$ 2.600,00    

- Total do projeto industrial em 12 meses: R$ 1.132.095,50      

&emsp;Essa comparação direta permite visualizar com clareza a evolução da solução: de um protótipo acessível para uma aplicação robusta e realista em ambiente hospitalar. A distinção entre custos diretos e indiretos, bem como entre despesas de capital (CAPEX) e operacionais (OPEX), fornece uma base sólida para o planejamento estratégico do projeto em longo prazo.




