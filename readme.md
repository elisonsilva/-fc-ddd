# Desafio Full Cycle 

## Módulo DDD: Modelagem Tática e Patterns
A linguagem de programação para este desafio é Node/JavaScript.

### Resumo do desafio - Métodos de OrderRepository

Este desafio consiste basicamente em:

- Nesse desafio você deverá fazer com que a classe OrderRepository implemente totalmente os métodos definidos pelo OrderRepositoryInterface.
- Toda essa implementação deverá ser reproduzida através de testes.


------------------
### Entrega do desafio

Rodando:

```
npm install
npm test
```
![Print screen](https://github.com/elisonsilva/-fc-ddd/blob/master/screenshot.jpg?raw=true)

### Anotações
Entity
Complexidade de negocio (Requisito de negocio - como o cliente quer que funciona)
Domain (Mundo interno)
- Entity
-- files ...
- Repository
-- files ...

Complexidade acidental (Requisito funcionando do sistema - como o sistema deve funciona)
Infrastructure (Mundo externo ORM, APIs, Objects, etc...)
- Entity
-- files ...
- Repository
-- files ...