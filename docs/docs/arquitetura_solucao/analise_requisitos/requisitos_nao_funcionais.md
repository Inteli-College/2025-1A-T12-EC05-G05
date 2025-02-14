---
title: Requisitos não funcionais
sidebar_position: 2
---

# 🔒 Requisitos Não Funcionais 
&emsp; Os requisitos não funcionais descrevem **características de qualidade** que englobam aspectos como desempenho, usabilidade, confiabilidade, segurança, e outros atributos a fim de estabelecer padrões de qualidade do sistema.  

&emsp; Para garantirmos um nível de qualidade ideal de nosso software, definimos os seguintes requisitos não funcionais:

## 📋 Lista de Requisitos Não Funcionais 
| RNF# | Descrição | Categoria | 
|------|-----------|-----------| 
| RNF01 | Deve haver um pop-up para questionar a ociosidade do usuário após 5 minutos de inatividade. | Usabilidade |
| RNF02 | Caso o pop-up não receba interação dentro de 1 minuto após seu surgimento, deve haver um logout automático do usuário. | Usabilidade |
| RNF03 | O robô deve conseguir coletar cada componente necessário para a fita em um tempo menor que 30 segundos. | Desempenho |


<details> 
    <summary>🔍 Ver mais requisitos</summary> 
    | RNF# | Descrição | Categoria | 
    |------|-----------|-----------| 
    | RNF04 | O sistema deve ter um tempo de resposta menor do que 30 segundos para enviar os comandos para o robô. | Disponibilidade | 
    | RNF05 | O sistema deve garantir uma precisão de 90% na coleta dos componentes. | Confiabilidade | 
    | RNF06 | O sistema deve garantir uma precisão de 95% na devolução dos componentes em seus respectivos bins. | Confiabilidade | 
    | RNF07 | A interface do usuário deve ser responsiva e funcionar corretamente em diferentes navegadores (Chrome, Firefox, Safari) e dispositivos (desktop, tablet, smartphone). | Disponibilidade | 
    | RNF08 | O tempo de requisição não deve exceder 750 milissegundos. | Desempenho | 
    | RNF09 | Deve-se implementar o método hash nas senhas ao armazená-las no banco de dados. | Segurança | 
    | RNF10 | O sistema deve garantir que o acesso seja permitido apenas para usuários autenticados através de login e senha. | Segurança | 
    | RNF11 | O software deve apresentar o histórico de fitas médicas dos últimos 2 meses. | Usabilidade | 
</details> 
    
## ✅ Conclusão 
Os requisitos não funcionais são importantes para garantir um sistema **confiável, seguro e eficiente**. Eles definem como o sistema deve se comportar em **desempenho, segurança e experiência do usuário**. Sendo assim, para o projeto ter suas funcionalidades bem definidas, um alto nível de qualidade e sucesso é muito importante **a validação dos requisitos não funcionais** e sua constante atualização e adequação. 