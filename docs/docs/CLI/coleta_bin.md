---
title: "📃 Coleta por Bin"
sidebar_label: "Coleta por Bin"
sidebar_position: 2
---
## 🔍 O que é?

&emsp; A **coleta por bin** é um método implementado na ```CLI``` para a coleta automatizada de medicamentos em bins específicos. Esse processo permite determinar a quantidade exata de itens a serem coletados de cada bin, garantindo maior controle e precisão na operação.

## 🤔 Como funciona?

&emsp; A função recebe como entrada a quantidade de medicamentos que devem ser retirados de cada bin. Esses valores são passados como argumentos e armazenados em um dicionário para facilitar o processamento.

&emsp; O código responsável por essa funcionalidade é:

```python
@cli.command()
def collect_bin(
    bin_1: Annotated[int, typer.Argument(help="Quantidade de medicamentos do bin 1")] = 0,
    bin_2: Annotated[int, typer.Argument(help="Quantidade de medicamentos do bin 2")] = 0,
    bin_3: Annotated[int, typer.Argument(help="Quantidade de medicamentos do bin 3")] = 0,
    bin_4: Annotated[int, typer.Argument(help="Quantidade de medicamentos do bin 4")] = 0,
    bin_5: Annotated[int, typer.Argument(help="Quantidade de medicamentos do bin 5")] = 0,
):
    bin_counts = {
        1: bin_1,
        2: bin_2,
        3: bin_3,
        4: bin_4,
        5: bin_5,
    }
    
    for bin_num in range(1, 6):
        for _ in range(bin_counts[bin_num]):
            take_medicine(f"bin_{bin_num}")
```

&emsp; No código acima:
- Os valores de entrada são armazenados no dicionário ```bin_counts```, onde cada chave representa um bin e o valor associado indica a quantidade de medicamentos a serem coletados.
- O loop percorre os bins de 1 a 5 e, para cada um, chama a função ```take_medicine()``` de acordo com a quantidade informada.

## 📋 Testes

&emsp; Para verificar a funcionalidade, foi realizado um teste passando os seguintes argumentos:

```shell
python cli.py collect_bin 2 1 3 2 1
```

Neste caso, o sistema coletará:
- **2** medicamento do **bin 1**
- **1** medicamentos do **bin 2**
- **3** medicamento do **bin 3**
- **2** medicamentos do **bin 4**
- **1** medicamentos do **bin 5**

&emsp; O vídeo abaixo demonstra o teste realizado:

<iframe width="560" height="315" src="https://www.youtube.com/embed/ITf1zWd6Wp0?si=J0BAWA2ujUIeheMH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style={{display:"block", marginLeft:"auto", marginRight:"auto"}}></iframe>

## ✅ Conclusão

&emsp; A **coleta por bin** proporciona uma solução eficiente para a retirada automatizada de medicamentos, garantindo precisão e organização no fluxo operacional. Esse método permite que a coleta seja realizada de forma ordenada e controlada, reduzindo erros e aumentando a confiabilidade do processo.
