# Inteli - Instituto de Tecnologia e Liderança 

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="assets/inteli.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0" width=40% height=40%></a>
</p>

<br>

# Sistema Automatizado de Separação de Medicamentos 

<img src=""/>

## 👨‍🎓 Integrantes: 
- <a href="https://www.linkedin.com/in/danilo-martins-merlo-381b76228/">Danilo Martins Merlo</a>
- <a href="https://www.linkedin.com/in/davi-nascimento-de-jesus/">Davi Nascimento de Jesus</a> 
- <a href="http://linkedin.com/in/gabriel-martins-alves/">Gabriel Henrique Martins Alves</a>
- <a href="https://www.linkedin.com/in/jo%C3%A3o-v-wandermurem/">João Victor Wandermurem</a> 
- <a href="https://www.linkedin.com/in/mariella-kamezawa/">Mariella Sayumi Mercado Kamezawa</a>
- <a href="=https://www.linkedin.com/in/rafaela-s-o-lima/">Rafaela Silva de Oliveira Lima</a>
- <a href="https://www.linkedin.com/in/yasmim-passos/">Yasmim Marly Passos</a>

## 👩‍🏫 Professores:
### Orientador(a) 
- <a href="https://www.linkedin.com/in/murilo-zanini-de-carvalho-0980415b/">Murilo Zanini de Carvalho</a>
### Instrutores
- <a href="https://www.linkedin.com/in/andregodoichiovato/">André Godoi Chiovato</a>
- <a href="https://www.linkedin.com/in/filipe-gon%C3%A7alves-08a55015b/">Filipe Gonçalves</a>
- <a href="https://www.linkedin.com/in/geraldo-magela-severino-vasconcelos-22b1b220/">Geraldo Magela Severino Vasconcelos</a>
- <a href="https://www.linkedin.com/in/gui-cestari/">Guilherme Cestari</a>
- <a href="https://www.linkedin.com/in/lisane-valdo/">Lisane Valdo</a> 
- <a href="https://www.linkedin.com/in/rodrigo-mangoni-nicola-537027158/">Rodrigo Mangoni Nicola</a> 

## 📜 Descrição

&emsp;A solução Prescript é um projeto inovador desenvolvido pelos alunos do 5º módulo de Automação com Garra Robôtica do 2º ano da faculdade Inteli, em parceria com o Hospital de Clínicas da Unicamp. O sistema visa resolver o desafio crítico da separação manual de medicamentos para pacientes internados, que é suscetível a erros humanos, como duplicidade, falhas de separação e desperdício. O sistema automatiza todo o processo, garantindo maior segurança, agilidade e precisão na entrega dos medicamentos.

&emsp;O sistema utiliza uma interface por aplicação web, permitindo sua operação através de um fluxo sim. A integração com o leitor de QR Code é um ponto chave da solução, pois permite a validação automática dos medicamentos antes da coleta. O robô, então, utiliza essas informações para identificar e conferir os produtos, garantindo que cada item seja o correto antes de ser incluído no kit de medicamentos do paciente.

&emsp;A movimentação do robô Dobot foi otimizada continuamente para garantir precisão e eficiência durante o processo de coleta e movimentação dos medicamentos. O sistema permite que o robô execute o movimento de coleta com alta precisão, reduzindo significativamente o tempo necessário para a montagem das Fitas de Medicamentos. Isso permite que a equipe farmacêutica se concentre em tarefas mais críticas, como a revisão de protocolos e assistência farmacêutica direta.

&emsp;A principal funcionalidade do sistema é a automação do processo de separação de medicamentos, o que não só facilita a operação em ambientes farmacêuticos e hospitalares, mas também minimiza os erros humanos e melhora a eficiência do processo. O robô é capaz de validar os medicamentos automaticamente, coletá-los e movê-los com precisão, garantindo a segurança e a agilidade do processo de entrega.

&emsp;Com o objetivo de melhorar a produtividade, a segurança e a confiabilidade dos processos de separação de medicamentos, a solução Prescript se apresenta como uma inovação tecnológica no mercado farmacêutico, estabelecendo um novo padrão para a gestão automatizada de medicamentos em ambientes hospitalares.



## 📁 Estrutura de pastas

Dentre os arquivos e pastas presentes na raiz do projeto, definem-se:

- <b>assets</b>: aqui estão os arquivos relacionados a parte gráfica do projeto, ou seja, as imagens e vídeos que os representam (O logo do grupo pode ser adicionado nesta pasta).

- <b>document</b>: aqui estão todos os documentos do projeto, incluindo o manual de instruções (se aplicável). Há também uma pasta denominada <b>outros</b> onde estão presentes outros documentos complementares.

- <b>src</b>: Todo o código fonte criado para o desenvolvimento do projeto, incluindo firmware, notebooks, backend e frontend, se aplicáveis.

- <b>README.md</b>: arquivo que serve como guia e explicação geral sobre o projeto (o mesmo que você está lendo agora).

## 🔧 Instalação

&emsp;Esta seção apresenta os passos necessários para configurar o ambiente virtual do projeto, garantindo uma experiência eficiente durante o uso.

Para visualizar a documentação no **Docusaurus**, siga os passos abaixo:  

1. **Acesse a pasta `docs`**  
```sh
cd docs
```

2. **Instale os pacotes necessários**

```sh
npm install
```

3. **Inicie o servidor local**
```sh
npm start
```

## **⌨️ 3. Execução do Código do Robô**  

Para executar a **CLI** do robô, basta ter o **Python instalado** em sua máquina. Em seguida, siga os passos abaixo para configurar seu ambiente:  

### **3.1 Acesse a pasta `src` na raiz do repositório**  
```sh
cd src
```

### **3.2 Crie um ambiente virtual para instalar as dependências do projeto**
```sh
python3 -m venv nome_da_venv
```

### **3.3 Ative o ambiente virtual**
- No Linux ou macOS
```sh
source nome_da_venv/bin/activate
```
- No Windows
```sh
nome_da_venv\Scripts\Activate
```

### **3.4 Instale as bibliotecas necessárias**
```sh
pip install -r requirements.txt
```

### **3.5 Execute a CLI do robô**
```sh
python3 cli.py --help
```

Esse comando exibe todas as funções disponíveis na CLI, permitindo começar a operar o robô.


## 🗃 Histórico de lançamentos

* 0.5.0 - 11/04/2025
    * **[Sprint 5]** <br><br>
* 0.4.0 - 28/03/2025
    * **[Sprint 4]** <br><br>
* 0.3.0 - 14/03/2025
    * **[Sprint 3]** <br><br>
* 0.2.0 - 28/02/2025
    * **[Sprint 2]** <br><br>
* 0.1.0 - 14/02/2025
    * **[Sprint 1]** 

#

<br><br>


## 📋 Licença/License

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/Inteli-College/2024-2B-T11-IN04-G03">Sense</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.inteli.edu.br/">INTELI,</a> <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/ceciliagalvaoo">CECÍLIA BEATRIZ MELO GALVÃO, </a> <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/MerigoDavi">DAVI DE OLIVEIRA FERREIRA, </a><a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/nDaviii">DAVI NASCIMENTO DE JESUS, </a> <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/kauarodriguessss">KAUÃ RODRIGUES DOS SANTOS,</a> <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/lucastort1">LUCAS COZZOLINO TORT,</a> <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/matheusfrn">MATHEUS FERNANDES GUIMARÃES DE SOUSA,</a> <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/viniciusmflor">VINICIUS MACIEL FLOR,</a> <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/yasmimpassos">YASMIM MARLY PASSOS</a> is licensed under <a href="https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Creative Commons Attribution 4.0 International<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""></a></p>
