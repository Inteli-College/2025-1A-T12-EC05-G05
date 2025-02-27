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
&emsp; A função recebe como argumento um objeto `Position` e verifica se a chave `suction` está ativada. Se estiver ativada, a ferramenta de sucção do robô é ligada; caso contrário, ela é desligada.

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
&emsp; A função recebe um objeto `Position` e um valor opcional de altura adicional. Ela carrega os dados da posição, ajusta a coordenada `z` caso necessário e executa o movimento do robô. Dependendo do tipo de movimento indicado na posição (`move_l` ou `move_j`), o robô usa um movimento linear ou de junta.

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
&emsp; A entrega segue um ciclo de posições pré-configuradas, identificadas como `delivery_1`, `delivery_2`, etc. A função percorre essas posições, ajustando a altura da entrega a cada seis medicamentos para evitar colisões.

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
    bin: Annotated[str, typer.Argument(help="Name of the bin from which medicine should be taken.")]
):
    for position in data[bin]:
        check_suction(position)
        execute_movement(position)
    deliver()
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

&emsp; As funções auxiliares desempenham um papel essencial no funcionamento do sistema, garantindo a movimentação do robô, ativação da sucção, coleta e entrega dos medicamentos. O design modular do código facilita a manutenção e possíveis melhorias futuras, tornando a automação mais eficiente e confiável.

