---
title: "💻 Command-line interface"
sidebar_label: "CLI"
sidebar_position: 1
---

## 🔍 O que é?

&emsp; A CLI (Command Line Interface) é uma forma de interação entre o usuário e o sistema através de comandos de texto. Ao contrário das interfaces gráficas (GUI), onde a interação é feita por meio de botões, janelas e ícones visuais, a CLI permite que o usuário execute operações digitando comandos diretamente no terminal.

&emsp; Essa abordagem é amplamente utilizada por desenvolvedores devido à sua flexibilidade, rapidez e capacidade de automação. Com a CLI, é possível acessar funcionalidades avançadas, executar scripts e realizar tarefas em massa com eficiência, tornando ela uma ferramenta essencial em diversos ambientes de desenvolvimento e infraestrutura.

## 🎯 Impacto no projeto?

&emsp; No Prescript, o uso da CLI impacta diretamente os desenvolvimentos iniciais do código para o robô utilizado, sendo possível, por meio dela, movimentar o braço robótico, gravar posições, realizar testes nos periféricos e até mesmo criar sequências de movimentações, de modo geral é uma exclente ferramenta para os otimizar os primeiros passos do sistema que está sendo desenvolvido.

## 🏗 Arquitetura em nosso projeto:

&emsp; No esquema atual de organização do projeto nós possuímos 3 arquivos responsáveis pelo funcionamento adequado da CLI, sendo eles: ```cli.py```, ```dobotController.py``` e ```positions.py```, isso sem contar o arquivo ```config.json``` que é responsável por armazenar valores importantes para o código.

### CLI

&emsp; Esse arquivo é o cérebro da ```CLI```, É por meio dele que todas as movimentações e comandos são processados para depois serem enviados ao controller.

### Controller

&emsp; O ```controller``` é um arquivo que possui todas as funções base para controle e leitura de sensores presentes no robô, com ele somos capazes de:

- Nos conectar e desconectar ao robô;
- Receber as informações das posições atuais de seus eixos e juntas;
- Modificar sua velocidade de movimento;
- Realizar movimentações dos seus eixos de forma linear ou por meio das juntas;
- Enviá-lo para uma posição padrão denominada "home";
- Ativar e desativar o mecanismo de sucção;

### Positions

&emsp; O arquivo de ```positions``` é um facilitador e possui algumas funções dentro de sí que nos permitem exportar as posições do robô no formato ```.json``` e também realizar a leitura de arquivos no mesmo formato para informar quais movimentações o robô deve fazer.

### Config

&emsp; Por fim, o arquivo ```config.json``` é responsável por armazenar posições pré-definidas para a movimentação do robô, é nele que salvamos a "home", as posições de cada ```bin```, as múltiplas posições para a entrega dos medicamentos e as informações sobre qual tipo de movimento deve ser feito em cada momento e quando acionar a sucção ou não.

## ⌨️ Execução

&emsp; Para executar a CLI basta ter o python instalado em sua máquina, por meio de um terminal acessar a pasta ```src``` na raiz do repositório e executar os seguintes comandos para configurar seu ambiente:

- ```python3 -m venv (nome para sua venv)``` -> Cria um ambiente virtual para instalar as bibliotecas.;
- ```source /(nome da sua venv)/bin/activate``` (se estiver usando uma distribuição Linux ou macOs) ou ```/(nome da sua venv)/Scripts/Activate``` (caso esteja utilizando Windows) -> Comando para ativar o ambiente virtual.;
- ```pip install -r requirements.txt```-> Para baixar todas as bibliotecas necessárias para o funcionamento do projeto;

&emsp; Após o ambiente ser configurado basta executar o comando ```python3 cli.py --help``` para ver as funções da CLI e começar a operar o robô.