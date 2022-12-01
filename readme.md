# Desafio Full Cycle 

## Módulo DDD: Modelagem Tática e Patterns
A linguagem de programação para este desafio é Node/JavaScript.

## Desafio 1
### Resumo do desafio 1 - Métodos de OrderRepository

Este desafio consiste basicamente em:

- Nesse desafio você deverá fazer com que a classe OrderRepository implemente totalmente os métodos definidos pelo OrderRepositoryInterface.
- Toda essa implementação deverá ser reproduzida através de testes.

### Entrega do desafio 1

```bash
npm install
# Single test
npm test -- order.repository.spec.ts
```
------------------


## Desafio 2
### Resumo do desafio 2 - Eventos de Customer

Este desafio consiste basicamente em:

- O primeiro evento deverá acontecer quando um novo Customer é criado. 
- Nesse ponto, crie 2 handlers exibindo um "console.log". 

    - Handler1: EnviaConsoleLog1Handler. Mensagem: "Esse é o primeiro console.log do evento: CustomerCreated".
    - Handler2: EnviaConsoleLog2Handler. Mensagem: "Esse é o segundo console.log do evento: CustomerCreated". 

- O segundo evento deverá ser disparado quando o endereço do Customer é trocado *(método changeAddress())*. 
- Nesse caso, o ID, Nome, bem como os dados do endereço devem ser passados ao evento.

    - Handler: EnviaConsoleLogHandler. Mensagem: "Endereço do cliente: {id}, {nome} alterado para: {endereco}".

### Entrega do desafio 2

```bash
npm install
# Single test
npm test -- event-dispatcher.spec.ts
```
------------------
*Fim*

![Print screen](https://raw.githubusercontent.com/elisonsilva/-fc-ddd/master/screenshot.png?token=GHSAT0AAAAAAB3X6Z73BMPKELW6F35W3Z7CY4FIDOA)


```bash
# Todos os testes
npm install
npm test 
```

### Anotações
Entity
Complexidade de negocio (Requisito de negocio - como o cliente quer que funciona)
Domain (Mundo interno)
- Entity
- ./files ...
- Repository
- ./files ...

Complexidade acidental (Requisito funcionando do sistema - como o sistema deve funciona)
Infrastructure (Mundo externo ORM, APIs, Objects, etc...)
- Entity
- ./files ...
- Repository
- ./files ...
