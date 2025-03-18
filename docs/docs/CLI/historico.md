---
title: "📝 Histórico"
sidebar_label: "Histórico"
sidebar_position: 1
---

## 🔍 O que é?

&emsp; Na `CLI`, foi implementado o *histórico* que registra informações sobre as solicitações de pedidos de medicamentos. Como nesta sprint não há integração com ferramentas de front-end, optamos por uma interface diretamente na linha de comando, que funciona como uma espécie de pré-interface. Dessa forma, buscamos tornar a interação o mais agradável possível neste estágio do desenvolvimento. Atualmente, o histórico armazena dados essenciais, como a data e a hora da solicitação, o nome do responsável e os medicamentos separados.   
&emsp; Atualmente, o histórico armazena dados, como a data e hora da solicitação, o nome do responsável e os medicamentos separados.  Além disso, há planos para implementar outros logs no histórico, como registros das ações do robô, erros e reposições de estoque. Com isso, o sistema proporcionará um acompanhamento ainda mais estruturado e preciso das operações realizadas.

## 🤔 Como funciona?

&emsp; O histórico funciona da seguinte forma: ao selecionar a opção de separação de medicamentos, o usuário escolhe os itens desejados, e essas informações são registradas no banco de dados, que atualmente utiliza o SQLite. Dessa forma, ao acessar a opção de histórico na `CLI`, é possível visualizar detalhes das solicitações, como os medicamentos separados, a data e hora da solicitação e o nome do responsável pelo pedido.

&emsp; Abaixo o trecho de código responsável pela implementação do histórico na CLI, registrando e exibindo as solicitações de separação de medicamentos:

```python
def historico(conn):
    try:
        cursor = conn.cursor()
        
        # Query para buscar os logs com tipo 'pedido'
        query = '''
        SELECT data, user, paracetamol, dipirona, buscopam, dorflex, ibuprofeno
        FROM logs
        WHERE tipo = 'pedido'
        ORDER BY data DESC
        '''
        
        cursor.execute(query)
        logs = cursor.fetchall()
        
        if logs:
            for log in logs:
                data = log[0]  # data
                user = log[1]  # nome do usuário
                medicamentos = []
                
                # Verificar os medicamentos solicitados
                if log[2] == 1:
                    medicamentos.append("Paracetamol")
                if log[3] == 1:
                    medicamentos.append("Dipirona")
                if log[4] == 1:
                    medicamentos.append("Buscopan")
                if log[5] == 1:
                    medicamentos.append("Dorflex")
                if log[6] == 1:
                    medicamentos.append("Ibuprofeno")
                
                # Formatar e exibir a mensagem
                if medicamentos:
                    hora = data.split(" ")[1]  # Extrair a hora da data
                    print(f"\n No dia {data[:10]} às {hora}, {user} solicitou a separação dos medicamentos: {', '.join(medicamentos)}.")
                else:
                    print(f"No dia {data[:10]} às {hora}, Dobot separou ...") #AJUSTAR AQUI!!!
        else:
            print("Não há registros de pedidos.")
            
    except Exception as e:
        print(f"Erro ao consultar o histórico: {e}")
    finally:
        if cursor:
            cursor.close()
```




## ✅ Conclusão

&emsp; Com a implementação do histórico na `CLI`, garantimos um registro organizado e acessível das solicitações de separação de medicamentos. Isso possibilita um acompanhamento mais eficiente das operações, trazendo mais transparência e controle para o processo.