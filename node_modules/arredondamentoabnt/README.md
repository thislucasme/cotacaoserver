# Arredondamento de numeros seguindo a ABNT 

Link para a norma ABNT http://www.abnt.org.br/noticias/2876-regras-de-arredondamento-na-numeracao-decimal

O objetivo desse projeto é implementar uma classe que permite o arredondamento de um numero float ou double de acordo com as normas ABNT.

## Exemplos de uso

> Você pode encontrar mais exemplos de como utilizar essa lib na pasta test

Primeiro importe a biblioteca

```javascript
const ABNT_5891_1977 = require('arredondamentoabnt').ABNT_5891_1977
```

Instancie a classe passando a quantidade de casas decimais desejada.
```javascript
const abnt = new ABNT_5891_1977(2);
```

solicite ao objeto para arredondar o valor.

```javascript
let vArredondado = abnt.arredonda(129.995);
//Valor retornado deverá ser "130.00"
```
