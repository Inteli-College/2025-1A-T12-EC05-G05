---
title: "📃 Coleta por lista"
sidebar_label: "Coleta por lista"
sidebar_position: 3
---

## 🔍 O que é?

&emsp; Dentro da ```CLI``` existem duas principais funções responsáveis por coletar as medicações nos bins que imaginamos que podem ser utilizadas durante o desenvolvimento do projeto. Neste documento, vamos apresentar a ```coleta por lista```.

## 🤔 Como funciona?

&emsp; A ideia principal é que nosso código receba uma lista desordenada contendo apenas os números dos bins que precisam ser coletados. Por exemplo, se houver uma requisição de ```2 remédios do bin 1``` e ```3 remédios do bin 5```, a lista pode chegar de diversas formas dependendo da forma que for processada pelo sistema do hospital. Alguns exemplos são:

- ```[5, 1, 1, 5, 5]```
- ```[1, 5, 1, 5, 5]```
- ```[5, 5, 1, 1, 5]```

&emsp; Pensando nessa possibilidade, desenvolvemos um código que organiza a lista enviada para ele e, em seguida, inicia a coleta de cada bin.

```python
def collect_list(
    input_list: Annotated[List[str], typer.Argument(help="List of bins to collect")],
):
    ordered_list = sorted(input_list)
    for bin_num in ordered_list:
        take_medicine(f'bin_{bin_num}')
```

&emsp; O código recebe a lista dos bins que precisam ser coletados, utiliza o método ```sorted()``` do Python para organizá-los em ordem crescente e, em seguida, executa um ```for``` para coletar todos os medicamentos solicitados, enviando os valores da lista para a função ```take_medicine()``` por meio do sistema de ```f-string```, que permite inserirmos valores dentro de uma ```string```.

## 📋 Testes

&emsp; Para comprovar a viabilidade desse código, realizamos um teste enviando a seguinte lista de valores para ele: ```[5, 3, 1, 4, 2, 2, 3]```

&emsp; Vídeo demonstrando o teste:

<iframe width="900" height="500" src="https://www.youtube.com/embed/qNKu9K5KKDU?si=9uVXZ4fdQ_gTb00s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style={{display:"block", marginLeft:"auto", marginRight:"auto"}}></iframe>

## ✅ Conclusão

&emsp; A utilização da CLI em conjunto com o código desenvolvido para organizar e coletar medicamentos a partir de uma lista desordenada demonstra ser uma solução eficiente e adaptável ao fluxo operacional do projeto. Essa abordagem não só comprova a viabilidade técnica da solução proposta, como também reforça sua aplicabilidade para resolver o problema de coleta automatizada em ambientes hospitalares, garantindo maior organização e confiabilidade no processo.