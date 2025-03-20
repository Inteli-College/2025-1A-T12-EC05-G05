---
title: "💊 Separação"
sidebar_label: "Separação"
sidebar_position: 1
---

## 🔍 O que é?

&emsp;  A **separação de medicamentos** É uma funcionalidade disponível na `CLI`, permitindo que o usuário solicite a separação dos medicamentos desejados de forma organizada. Atualmente, as solicitações ainda não estão sendo processadas para a separação real, pois a integração ainda não foi concluída. No entanto, o que está integrado até o momento é o banco de dados, onde todas as solicitações são registradas, mas ainda não realizadas a separação dos medicamentos.

## 🤔 Como funciona?

&emsp; No menu inicial da CLI, o usuário seleciona a opção de separação de medicamentos digitando o número correspondente, que, neste caso, é o 1. Em seguida, é exibida uma lista com os nomes dos medicamentos disponíveis, que atualmente estão mocados. O usuário pode então selecionar os desejados digitando seus respectivos números. Após a escolha, o processo de separação é iniciado.

A seguir está o código dessa função:

```python
def menu_de_separacao(conn, nome):
    medicamentos = {
        '1': 'Paracetamol',
        '2': 'Dipirona',
        '3': 'Buscopan',
        '4': 'Dorflex',
        '5': 'Ibuprofeno'
    }

    while True:
        time.sleep(2)
        print("\n 💊 MENU DE SEPARAÇÃO")
        time.sleep(2)
        print("    ➣  Selecione os medicamentos que deseja separar:")
        time.sleep(1)
        for chave, valor in medicamentos.items():
            print(f"        ➣  {chave}. {valor}")
        print("        ➣  6. Voltar")
        time.sleep(2)
        
        escolha = input("Digite os números dos medicamentos a serem separados separados por vírgula: ")
        
        # Se o usuário escolher voltar (opção 6)
        if escolha == '6':
            return  
            menu_inicial(conn, nome);
          
        escolhas = escolha.split(',')

        # Verifica se há números repetidos na escolha
        if len(escolhas) != len(set(escolhas)):
            print("\nInfelizmente só temos uma unidade de medicamento em cada bin. Tente novamente.")
        else:
            # Se não houver repetição, define os valores para os medicamentos selecionados
            medicamentos_selecionados = {
                'paracetamol': 0,
                'dipirona': 0,
                'buscopam': 0,
                'dorflex': 0,
                'ibuprofeno': 0
            }

            for num in escolhas:
                if num == '1':
                    medicamentos_selecionados['paracetamol'] = 1
                elif num == '2':
                    medicamentos_selecionados['dipirona'] = 1
                elif num == '3':
                    medicamentos_selecionados['buscopam'] = 1
                elif num == '4':
                    medicamentos_selecionados['dorflex'] = 1
                elif num == '5':
                    medicamentos_selecionados['ibuprofeno'] = 1

            # Inserir os dados na tabela `logs`
            try:
                cursor = conn.cursor()
                
                # Prepare os dados para a inserção
                query = '''
                INSERT INTO logs (user, tipo, paracetamol, dipirona, buscopam, dorflex, ibuprofeno, erro, qr_code, bin)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                '''
                
                # Dados a serem inseridos
                dados = (
                    nome,  # nome do usuário
                    'pedido',  # tipo sempre será 'pedido'
                    medicamentos_selecionados['paracetamol'],
                    medicamentos_selecionados['dipirona'],
                    medicamentos_selecionados['buscopam'],
                    medicamentos_selecionados['dorflex'],
                    medicamentos_selecionados['ibuprofeno'],
                    None,  # erro (deixa vazio se não houver erro)
                    None,  # qr_code (deixa vazio)
                    None
                )
                
                cursor.execute(query, dados)
                conn.commit()
                
                print("\nSeparação registrada com sucesso!")
                menu_de_separacao(conn, nome)
            except Exception as e:
                print(f"Erro ao registrar a separação: {e}")
                menu_de_separacao(conn, nome)
```

## ✅ Conclusão

&emsp; &emsp;Portanto, com a separação de medicamentos na `CLI` facilita a gestão das solicitações, tornando o processo mais ágil e estruturado. Com uma interface simples e funcional, o sistema garante maior controle e organização, contribuindo para a eficiência operacional.