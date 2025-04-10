---  
title: Esquemático do Circuito Eletrônico
sidebar_label: Esquemático do Circuito Eletrônico
sidebar_position: 1
---

# 📐 **Esquemático do Circuito Eletrônico**

## 🔍 **O que são Esquemáticos?**

Esquemáticos de circuito são representações gráficas detalhadas de um circuito eletrônico, onde os componentes, como resistores, capacitores, transistores, e outros, são mostrados de forma simbólica e conectados de acordo com o funcionamento esperado. Eles servem como um guia para a construção de circuitos físicos, facilitando o entendimento e a implementação de projetos eletrônicos. 

Esses diagramas são essenciais, pois permitem que engenheiros, desenvolvedores e técnicos visualizem e compreendam a estrutura e os fluxos de corrente elétrica dentro do sistema. Além disso, são fundamentais para depuração, manutenção e futuras modificações do circuito, garantindo a longevidade e a confiabilidade do sistema eletrônico.

:::info
<b>Por que esquemáticos são importantes?</b>

Esquemáticos são de extrema importância em projetos eletrônicos por diversas razões. Eles servem como documentação técnica, sendo usados como referência e guia durante a construção e manutenção de circuitos. Além disso, proporcionam facilidade na resolução de problemas, ajudando na identificação de falhas e problemas nos componentes e conexões. 

A reusabilidade é outro benefício significativo, pois esquemáticos podem ser reutilizados em futuros projetos, reduzindo o tempo de desenvolvimento. Finalmente, eles garantem uma comunicação clara entre as equipes de desenvolvimento e de manutenção, já que todos possuem a mesma visão do sistema, facilitando a colaboração e o entendimento compartilhado.

:::

## 🔌 **Visão Geral**

<div align="center">

  <sub>Figura 1 - Esquemático do Projeto </sub><br/>

  <img src="../../img/schematic.png"/><br/>

  <sup>Fonte: Material produzido pelos autores (2025).</sup>

</div>

Este esquemático demonstra a conexão entre uma **Raspberry Pi** e os componentes principais: o **leitor de QR Code (MH-ET Live Scanner V3.0)** e o **sensor infravermelho TCRT5000**. O circuito é projetado para capturar e processar dados de QR Codes e detectar objetos ou alterações no ambiente por meio do sensor infravermelho.

## 🔧 **Componentes Utilizados**
1. **Raspberry Pi Modelo 5** - A placa principal que gerencia e processa as entradas do QR Code e do sensor infravermelho.
2. **Leitor de QR Code MH-ET Live Scanner V3.0** - Sensor dedicado à leitura de QR Codes e fornecimento dos dados à Raspberry Pi.
3. **Sensor Infravermelho TCRT5000** - Usado para detectar objetos ou movimentos, normalmente usado para evitar colisões ou detectar proximidade de objetos.
4. **Resistores R1 e R2** - Usados para limitar e estabilizar a corrente nos componentes.
5. **Fonte de Alimentação** - Alimenta o sistema completo, incluindo Raspberry Pi e os sensores.

## ⚡ **Funcionamento do Circuito**
- **Leitura do QR Code**: O **leitor MH-ET Live Scanner V3.0** é conectado à Raspberry Pi, e ao detectar um QR Code, ele envia as informações para o processador da Raspberry Pi, que pode processar e armazenar ou utilizar essas informações conforme necessário.
  
- **Detecção Infravermelha**: O **sensor TCRT5000** detecta a presença de objetos ou a proximidade através de reflexão infravermelha. Ele está conectado ao Raspberry Pi para monitorar o ambiente ao redor.

- **Processamento e Controle**: A Raspberry Pi processa os dados dos sensores e pode acionar outros dispositivos, como relés e LEDs, dependendo do fluxo programado.

## 💡 **Aplicações**
Este circuito pode ser utilizado em diversos cenários, como:
- **Sistemas de Controle de Acesso**: Onde um QR Code é lido para liberar ou bloquear o acesso.
- **Automação e Monitoramento de Proximidade**: Usando o TCRT5000 para detectar a presença de objetos ou pessoas em sistemas automatizados.
- **Rastreamento e Logística**: Com a leitura de QR Code para rastrear produtos ou itens em uma linha de produção.

## 🛠️ **Manuais de Uso dos Componentes**

### 📘 **Manual de Uso do Leitor de QR Code MH-ET Live Scanner V3.0**
O **MH-ET Live Scanner V3.0** é um módulo de leitura de QR Code que se conecta facilmente à Raspberry Pi via GPIO ou interface UART. O sensor fornece a capacidade de ler QR Codes a partir de uma câmera interna e enviar os dados via comunicação serial para a Raspberry Pi.

1. **Conexão e Pinagem**:
   - O scanner é alimentado por 5V e se comunica através da porta serial (UART). As conexões típicas são:
     - **TX** → GPIO da Raspberry Pi (para enviar dados de QR Code)
     - **RX** → GPIO da Raspberry Pi (para receber comandos)
     - **GND** → Terra (GND)
  
2. **Leitura de QR Code**:
   - Após a conexão, o leitor de QR Code pode ser acionado via um simples comando serial, onde a Raspberry Pi aguardará os dados do QR Code para processá-los. 

3. **Documentação**: Você pode acessar o manual completo e a documentação no [site oficial](https://www.mhetlive.com/).

### 📘 **Manual de Uso do Sensor Infravermelho TCRT5000**
O **sensor TCRT5000** é um sensor óptico de reflexão utilizado para detectar a presença ou proximidade de objetos. Ele utiliza uma combinação de emissor de luz infravermelha e receptor fotossensível para captar reflexos de objetos próximos.

1. **Conexão e Pinagem**:
   - O sensor TCRT5000 possui os seguintes pinos:
     - **VCC** → 5V (alimentação)
     - **GND** → Terra (GND)
     - **OUT** → GPIO da Raspberry Pi (para a leitura do sinal)

2. **Funcionamento**:
   - Quando um objeto entra na área de detecção, o sensor emite um sinal no pino **OUT**, que pode ser lido pela Raspberry Pi.
   - O sinal é digital (HIGH/LOW), podendo ser interpretado diretamente pela Raspberry Pi para detectar a presença ou ausência de objetos.
  
3. **Documentação**: O manual completo pode ser encontrado no [site do fabricante](https://www.vishay.com/docs/83723/tcrt5000.pdf).

---

## 🛠️ **Considerações Técnicas**
- **Alimentação**: Certifique-se de que o sistema está sendo alimentado corretamente, com 5V para os sensores e para a Raspberry Pi.
- **GPIO**: A Raspberry Pi deve ser configurada para ler as entradas serial do QR Code e as leituras do sensor infravermelho.
- **Sensibilidade do TCRT5000**: Ajustes podem ser necessários no sensor TCRT5000 para garantir que ele detecte objetos na distância desejada.


# ✅ **Conclusão**

Esquemáticos são ferramentas essenciais para o design, desenvolvimento e manutenção de sistemas eletrônicos, proporcionando uma representação clara e detalhada do circuito. Com a documentação correta, como esquemáticos, o trabalho de engenharia eletrônica se torna muito mais eficiente, garantindo que os projetos sejam mais confiáveis, escaláveis e fáceis de depurar. Em um projeto como o de automação de separação de medicamentos, por exemplo, o esquemático desempenha um papel crucial na integração de diversos sistemas, como o robô e os sensores, que precisam estar devidamente conectados e funcionando em conjunto.

Ao utilizar esquemáticos, podemos garantir que cada componente do sistema esteja posicionado corretamente, operando de maneira eficiente e pronta para proporcionar a automação desejada com o mínimo de falhas.
