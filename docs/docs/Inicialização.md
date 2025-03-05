---
sidebar_label: "Inicialização"
---

# Inicializando a Aplicação Localmente

Para que você consiga executar a aplicação em seu ambiente local, é importante compreender os três pilares que a compõem: a interface de linha de comando (CLI), o front-end e o back-end. Cada um desses elementos foi cuidadosamente selecionado e implementado utilizando tecnologias modernas, que juntas formam uma arquitetura eficiente e completa.

<br/>

## Interface de Linha de Comando (CLI) 💻

A **CLI** é uma ferramenta versátil e eficiente que permite a interação com a aplicação por meio do terminal. Desenvolvida em **Python**, a CLI foi projetada para simplificar tarefas rotineiras, como iniciar o servidor, gerenciar scripts, executar comandos de manutenção e até mesmo automatizar processos complexos. A escolha do Python para esta interface não é aleatória: graças à sua sintaxe clara, ampla documentação e vasta biblioteca de módulos, Python facilita a criação de scripts ágeis e de fácil manutenção. Com essa ferramenta, os usuários podem configurar e monitorar a aplicação de forma rápida e sem a necessidade de uma interface gráfica elaborada.


## Front-end 🎨

O **front-end** da aplicação é responsável por toda a experiência visual e interação do usuário. Utilizamos o **React**, uma biblioteca JavaScript criada pelo Facebook que revolucionou o desenvolvimento de interfaces de usuário. O React adota uma abordagem baseada em componentes, permitindo que cada parte da interface seja modular e reutilizável. Isso torna o desenvolvimento mais organizado e a aplicação mais escalável, pois cada componente pode ser desenvolvido, testado e atualizado independentemente. Além disso, o React utiliza o Virtual DOM, que melhora significativamente a performance da aplicação, garantindo uma experiência fluida e responsiva, mesmo em interfaces complexas. Essa escolha reflete o compromisso com uma interface moderna e eficiente, que atende às expectativas dos usuários atuais.


## Back-end 🔧

No **back-end**, encontramos o núcleo que gerencia a lógica de negócio, o armazenamento e o processamento de dados da aplicação. Essa camada foi implementada utilizando o **Flask**, um micro-framework de Python conhecido por sua simplicidade e flexibilidade. O Flask permite a criação de APIs seguras, que servem como ponte entre o front-end e os sistemas de gerenciamento de dados. Sua estrutura minimalista possibilita uma rápida configuração e a adição de funcionalidades conforme necessário, sem impor uma arquitetura rígida. Dessa forma, o Flask facilita a integração com bancos de dados, serviços de autenticação e outras ferramentas essenciais para o funcionamento da aplicação, garantindo que a comunicação entre os diversos componentes seja eficiente e confiável.

<br/>

---

<br/>

## Como inicializar a CLI 💻

Para executar a interface de linha de comando (CLI) de nossa aplicação, siga as instruções detalhadas abaixo. Este procedimento garantirá que seu ambiente esteja configurado corretamente, permitindo que você utilize todas as funcionalidades oferecidas pela CLI.



### Pré-requisitos 🔧

- **Python:** Certifique-se de que o Python (versão 3.7 ou superior é recomendado) esteja instalado em sua máquina. Caso não esteja, acesse [python.org](https://www.python.org/downloads/).
- **Terminal:** Utilize um terminal (Prompt de Comando ou PowerShell no Windows, Terminal no Linux/macOS) para executar os comandos a seguir.



### Passo 1: Navegue até o Diretório da CLI 📂

Abra o terminal e acesse a pasta `dobot` do repositório, onde se encontram o arquivo `cli.py` e o arquivo `requirements.txt`.

Utilize o seguinte comando para navegar até esse diretório:
```bash
    cd 2025-1A-T12-EC05-G05/src/dobot
```


### Passo 2: Crie e Ative o Ambiente Virtual 🛠️

Crie um ambiente virtual para isolar as dependências do projeto com o comando:
```bash
    python3 -m venv nome_da_venv
```

> **Observação:** Substitua `nome_da_venv` pelo nome que desejar para o seu ambiente virtual.

Em seguida, ative o ambiente virtual:

- **Para Linux/macOS:**
```bash
        source nome_da_venv/bin/activate
```
- **Para Windows:**
```bash
        nome_da_venv\Scripts\Activate
```


### Passo 3: Instale as Dependências do Projeto 📦

Com o ambiente virtual ativado, instale todas as bibliotecas necessárias executando:
```bash
    pip install -r requirements.txt
```
Este comando fará o download e a instalação de todas as dependências listadas no arquivo `requirements.txt`.



### Passo 4: Execute a CLI e Confira as Funcionalidades 🔄

Após configurar o ambiente, execute o comando abaixo para visualizar as opções disponíveis na CLI:
```bash
    python3 cli.py --help
```
Este comando exibirá uma mensagem de ajuda com todas as funções e comandos disponíveis, permitindo que você comece a operar o robô via linha de comando.

Caso encontre algum problema, verifique se todas as dependências foram instaladas corretamente e se o ambiente virtual foi ativado com sucesso.

---

## Como inicializar o Front-end 🚀

Para executar o front-end de nossa aplicação localmente, siga as instruções detalhadas a seguir. Este procedimento permitirá que você configure e inicie o ambiente de desenvolvimento de forma adequada, garantindo que todas as dependências sejam corretamente instaladas e que a aplicação seja executada sem contratempos.

### Pré-requisitos 🔧

- **Node.js e npm:** Certifique-se de que o Node.js (versão 14 ou superior é recomendado) e o npm estão instalados em sua máquina, caso contrário instale [nesse link](https://nodejs.org/en).
- **Editor de Código:** Recomenda-se utilizar um editor de código, como o [Visual Studio Code](https://code.visualstudio.com/download), que facilita a edição, depuração e manutenção do código.

### Passo 1: Navegue até o Diretório do Front-end 📂

Abra o terminal e acesse o diretório que contém o arquivo `package.json` do front-end.

Utilize o seguinte comando para navegar até esse diretório:
```bash
    cd 2025-1A-T12-EC05-G05/src/frontend/src
```

### Passo 2: Instale as Dependências do Projeto 📦

Com o terminal posicionado no diretório correto, execute:
```bash
    npm install
```
Este comando fará o download e a instalação de todas as dependências listadas no arquivo `package.json`, as quais são indispensáveis para o funcionamento correto da aplicação.

### Passo 3: Inicie o Servidor de Desenvolvimento 🔄

Após a instalação das dependências, inicie o servidor de desenvolvimento com o comando:
```bash
    npm run start
```
Este comando compilará o projeto e iniciará um servidor de desenvolvimento. Normalmente, a aplicação ficará disponível na URL `http://localhost:3000` (ou em outra porta configurada no projeto).

### Passo 4: Acesse a Aplicação no Navegador 🌐

Abra o seu navegador de preferência e acesse:

    http://localhost:3000

Ao acessar essa URL, você visualizará a aplicação front-end em execução. O servidor de desenvolvimento conta com recarregamento automático (hot reload), permitindo que qualquer alteração no código seja imediatamente refletida na interface.

Caso haja qualquer problema durante o processo, verifique se todas as dependências foram instaladas corretamente e se o caminho do diretório está correto.

---

## Como inicializar o Back-end 🔧

Para executar o back-end de nossa aplicação localmente, siga as instruções detalhadas a seguir. Este procedimento garantirá que o ambiente esteja devidamente configurado, que todas as dependências sejam instaladas e que as variáveis de ambiente essenciais estejam definidas, assegurando o funcionamento correto do sistema.


### Pré-requisitos 📋

- **Python:** Certifique-se de que o Python (versão 3.7 ou superior é recomendado) esteja instalado em sua máquina.
- **Redis:** Baixe e instale o Redis. Para instruções de instalação, consulte [redis.io/download](https://redis.io/download). Certifique-se de que o Redis esteja em execução na URL padrão `redis://127.0.0.1:6379`.
- **Virtual Environment:** É recomendável utilizar um ambiente virtual para isolar as dependências do projeto.


### Passo 1: Navegue até o Diretório do Back-end 📂

Abra o terminal (ou prompt de comando) e acesse o diretório que contém o back-end da aplicação.

Utilize o seguinte comando para navegar até esse diretório:
```bash
    cd C:\Users\gabri\Documents\GitHub\2025-1A-T12-EC05-G05\src\backend
```

### Passo 2: Crie e Ative o Ambiente Virtual 🛠️

Crie um ambiente virtual no diretório atual executando:
```bash
    python -m venv venv
```
Em seguida, ative o ambiente virtual:

- **No Windows:**
```bash
      venv\Scripts\activate
```
- **No Linux/MacOS:**
```bash
      source venv/bin/activate
```

### Passo 3: Instale as Dependências do Projeto 📦

Com o ambiente virtual ativado, instale as dependências listadas no arquivo `requirements.txt` (que se encontra no mesmo nível da pasta `app`) com o seguinte comando:
```bash
    pip install -r requirements.txt
```

### Passo 4: Configure as Variáveis de Ambiente 🔑

É necessário definir uma variável de ambiente `SECRET_KEY` para proteger a aplicação. Crie um arquivo chamado **.env** no diretório do back-end (ao lado do arquivo `requirements.txt`) com o seguinte conteúdo:

    SECRET_KEY=your_random_secret_key_here

> Para gerar uma string aleatória, você pode usar o comando abaixo no terminal:
>```bash
>     python -c "import secrets; print(secrets.token_hex(16))"
>```
> Copie o resultado e substitua `your_random_secret_key_here` no arquivo **.env**.

O arquivo **.env** será carregado pela aplicação (através do `load_dotenv`) para configurar a variável `SECRET_KEY` e outras configurações necessárias.


### Passo 5: Execute a Aplicação Back-end 🚀

Após concluir a configuração, navegue até a pasta **app** e inicie a aplicação.
```bash
    python run app.py
```

A aplicação deverá ser iniciada e estará disponível na URL padrão, geralmente `http://127.0.0.1:5000`.


Caso haja qualquer problema, verifique se o Redis está em execução, se o ambiente virtual foi ativado e se as dependências foram instaladas corretamente.
