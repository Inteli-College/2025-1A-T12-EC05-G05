---
title: "🔧 Funções da CLI"
sidebar_label: "Funções da CLI"
sidebar_position: 1
---

## 🔍 Introdução  

&emsp; O código contém diversas funções auxiliares que garantem o funcionamento correto da coleta de medicamentos. Essas funções controlam desde a movimentação do robô até o acionamento da sucção para pegar e entregar os medicamentos corretamente. Neste documento, detalharemos cada uma dessas funções e seu papel no sistema.


## ⚙️ **check_suction()**  

### 📌 O que é?  
&emsp; Esta função verifica se a sucção deve ser ativada ou desativada com base nos dados da posição.

### 🛠️ Como funciona?  
&emsp; A função recebe como argumento um objeto Position e verifica se a chave suction está ativada. Se estiver ativada, a ferramenta de sucção do robô é ligada; caso contrário, ela é desligada.

### 💻 Código-fonte:  
```python
def check_suction(
    position: Annotated[Position, typer.Argument(help="Position data to check if suction should be enabled or disabled.")]
):
    if (position.get("suction")):
        dobot.enable_tool(100)
    else:
        dobot.disable_tool(100)
```


## ⚙️ **execute_movement()**  

### 📌 O que é?  
&emsp; A função responsável por mover o robô para uma posição específica.

### 🛠️ Como funciona?  
&emsp; A função recebe um objeto Position e um valor opcional de altura adicional. Ela carrega os dados da posição, ajusta a coordenada z caso necessário e executa o movimento do robô. Dependendo do tipo de movimento indicado na posição (move_l ou move_j), o robô usa um movimento linear ou de junta.

### 💻 Código-fonte:  
```python
def execute_movement(
    position: Annotated[Position, typer.Argument(help="Position data to determine and execute the appropriate movement.")],
    add_height: Annotated[int, typer.Argument(help="Additional height to be added to Z if it is the last position of the delivery.")] = 0
):
    spinner = yaspin(text=f"Moving to {position}...")
    current_position = Position()
    current_position.load_from_dict(position)

    current_position.z += add_height
    
    if position.get("move") == "move_l":
        dobot.move_l_to(current_position, wait=True)
    else:
        dobot.move_j_to(current_position, wait=True)
        
    spinner.stop()
```


## ⚙️ **deliver()**  

### 📌 O que é?  
&emsp; A função responsável por entregar os medicamentos coletados.

### 🛠️ Como funciona?  
&emsp; A entrega segue um ciclo de posições pré-configuradas, identificadas como delivery_1, delivery_2, etc. A função percorre essas posições, ajustando a altura da entrega a cada seis medicamentos para evitar colisões.

### 💻 Código-fonte:  
```python
def deliver():
    global deliver_value
    global add_height
    
    if deliver_value > 6:
        deliver_value = 1
        add_height += 20
            
    for index, position in enumerate(data[f"delivery_{deliver_value}"]):
        check_suction(position)
        
        if index != 1:
            execute_movement(position)
        else:
            execute_movement(position, add_height)
    deliver_value += 1
```


## ⚙️ **take_medicine()**  

### 📌 O que é?  
&emsp; A função responsável por coletar medicamentos de um bin específico.

### 🛠️ Como funciona?  
&emsp; A função recebe o nome do bin como argumento e percorre as posições associadas a ele no arquivo de configuração, ativando a sucção e movendo o robô conforme necessário.

### 💻 Código-fonte:  
```python
def take_medicine(
    bin: Annotated[str, typer.Argument(help="Name of the bin from which medicine should be taken.")],
    bin_n: Annotated[str, typer.Argument(help="Name of the bin from which medicine should be taken.")]
):
    positions = data.get(bin, [])
    
    if not positions:
        print(f"No data found for bin: {bin}")
        return
    
    first_position = positions[0]
    execute_movement(first_position)
    
    if validate(bin_n):
        for position in positions[1:]:
            check_suction(position)
            execute_movement(position)
        deliver()
```
## ⚙️ **ir_sensor()**

### 📌 O que é?  
&emsp; Esta função interage com o sensor infravermelho para verificar o status da coleta.

### 🛠️ Como funciona?  
&emsp; Ao ser chamada, a função realiza uma requisição HTTP para a API local de sensores. Em seguida, extrai o status do sensor identificando se a coleta do medicamento ocorreu da maneira correta ou não.

### 💻 Código-fonte:  

```python
def ir_sensor(timeout: int=10):
    print("\U0001F551 Verificando coleta")
    try:
        response = requests.get("http://localhost:5000/api/sensores", timeout=timeout)
        response.raise_for_status()
        status_coleta = response.json().get("caught")

        print(f"\U0001F4E1 Estado sensor IR: {status_coleta}")
        if status_coleta == "ALTO":
            return False
        elif status_coleta == "BAIXO":
            return True
    except requests.exceptions.RequestException as e:
        print(f"⏳ Falha ao obter leitura: {e}")
        return None
```

## ⚙️ **validate()**

### 📌 O que é?  
&emsp; Função responsável por validar se o medicamento coletado é o esperado para um determinado bin.

### 🛠️ Como funciona?  
&emsp; A função aguarda um intervalo para a bipagem do medicamento usando wait_before_suction(), depois compara os dados do medicamento esperado com os dados do medicamento escaneado obtidos por meio da função request_bip(). Se as informações coincidirem o robô inicia a coleta dos medicamentos.

### 💻 Código-fonte:  

```python

def validate(bin_n):
    
    wait_before_suction()
    expected_medicine = data_med.get(bin_n, [])
    scanned_medicine = request_bip()
    print(expected_medicine)

    if scanned_medicine == expected_medicine:
        print("✅ Medicamento validado. Descendo para coletar...")
        return True
    
    else:
        print("⚠️ Medicamento inválido! Retornando ao home.")
        return False
```

## ⚙️ **request_bip()**

### 📌 O que é?  
&emsp; Função responsável por solicitar a bipagem (verificação via HTTP) do medicamento.

### 🛠️ Como funciona?  
&emsp; A função envia uma requisição HTTP GET e obtém a resposta contendo as informações do medicamento para verificação.

### 💻 Código-fonte:  

```python
def request_bip(timeout: int = 10):
    print("\U0001F551 Solicitando bipagem via HTTP...")
    try:
        response = requests.get("http://localhost:5000/qrcode-response", timeout=timeout)
        response.raise_for_status()
        scanned_medicine = response.json()
        print(f"\U0001F4E1 Medicamento bipado recebido: {scanned_medicine}")
        return scanned_medicine
    except requests.exceptions.RequestException as e:
        print(f"⏳ Falha ao obter bipagem: {e}")
        return None
```

## ⚙️ **wait_before_suction**

### 📌 O que é?  
&emsp; Função que implementa um intervalo de espera antes da ativação da sucção, garantindo que a bipagem do medicamento seja processada corretamente.

### 🛠️ Como funciona?  
&emsp; Recebe um tempo de atraso (delay) como parâmetro para saber quanto tempo deve aguardar até a bipagem.

### 💻 Código-fonte:  

```python
def wait_before_suction(delay_time: float = 2.5):

    print(f"Aguardando {delay_time} segundos para bipagem do medicamento...")
    time.sleep(delay_time)
```

## ⚙️ **delivery_qrcode()**

### 📌 O que é?  
&emsp; Função responsável por executar a entrega dos QR codes utilizados para identificação das fitas.

### 🛠️ Como funciona?  
&emsp; A função busca na configuração as posições definidas para a entrega dos QR Codes. Em seguida, percorre cada posição, ativa ou desativa a sucção conforme necessário e executa os movimentos do robô para realizar a entrega.

### 💻 Código-fonte:  

```python
def delivery_qrcode():
    positions = data.get("delivery_qrcode", [])
    for position in positions:
            check_suction(position)
            execute_movement(position)
```

## ⚙️ **get_qrcode()**

### 📌 O que é?  
&emsp; Função responsável por iniciar o processo de coleta utilizando QR Code, começando pelo posicionamento do robô e validação do QR Code.

### 🛠️ Como funciona?  
&emsp; Inicialmente, a função realiza o movimento até a primeira posição configurada para a coleta do QR Code. Em seguida, chama a função validate_fita() para validar o QR Code. Se a validação for bem-sucedida, o robô inicia a coleta e entrega o QR code na caixa da fita com a função delivery_qrcode().

### 💻 Código-fonte:  

```python
def get_qrcode():
    positions = data.get("qrcode", [])    
    first_position = positions[0]
    execute_movement(first_position)
    
    if validate_fita():
        for position in positions[1:]:
            check_suction(position)
            execute_movement(position)
        delivery_qrcode()
```

## ⚙️ **validate_fita()**

### 📌 O que é?  
&emsp; Função que valida a informação lida do QR Code.

### 🛠️ Como funciona?  
&emsp; Após aguardar um breve intervalo com wait_before_suction(), a função realiza uma requisição HTTP para obter os dados do QR Code. Se a fita for válida, informa o sucesso permitindo a coleta pela função get_qrcode().

### 💻 Código-fonte:  

```python
def validate_fita():

    wait_before_suction()
    print("\U0001F551 Solicitando bipagem via HTTP...")
    try:
        response = requests.get("http://localhost:5000/qrcode-response")
        response.raise_for_status()
        scanned_medicine = response.json()
        if scanned_medicine.get("qr_code", "").startswith("A"):
            print(f"✅ Fita {scanned_medicine.get("qr_code")} validada. Descendo para coletar...")
            return True
        else:
            print("⚠️ Fita inválida! Retornando ao home.")

            return False
    except requests.exceptions.RequestException as e:
        print(f"⏳ Falha ao obter bipagem: {e}")
        return None
```

## ⚙️ **main()**  

### 📌 O que é?  
&emsp; A função principal, que inicializa a conexão com o robô e executa a interface de linha de comando (CLI).

### 🛠️ Como funciona?  
&emsp; A função:
1. Lista as portas disponíveis para conexão com o robô.
2. Solicita ao usuário que escolha uma porta.
3. Conecta-se ao robô e configura sua velocidade.
4. Executa a interface da CLI para permitir a execução dos comandos.

### 💻 Código-fonte:  
```python
def main():
    available_ports = list_ports.comports()
    print(f'available ports: {[x.device for x in available_ports]} \n')
    port_input = input("Desired port number: ")
    port = available_ports[int(port_input)].device
    spinner = yaspin(text=f"Connecting with port {port}...")
    spinner.start()
    dobot.connect(port)
    dobot.set_speed(150, 150)
    spinner.stop()
    cli()
```

## ✅ Conclusão  

&emsp;   As funções auxiliares desempenham um papel essencial no funcionamento do sistema, garantindo a movimentação do robô, ativação da sucção, coleta e entrega dos medicamentos. O design modular do código facilita a manutenção e possíveis melhorias futuras, tornando a automação mais eficiente e confiável.