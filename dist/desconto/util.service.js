"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilService = void 0;
const common_1 = require("@nestjs/common");
const enuns_1 = require("../enuns/enuns");
const types_1 = require("../models/types");
const price_service_1 = require("../price/price.service");
const ABNT_5891_1977 = require('arredondamentoabnt').ABNT_5891_1977;
const abnt = new ABNT_5891_1977(2);
const percent = require("percent-value");
let UtilService = class UtilService {
    constructor(priceService) {
        this.priceService = priceService;
    }
    async generateIdDataByArray(ids) {
        const idsArray = ids[0];
        const lastId = ids[0][idsArray.length - 1].item6;
        if (idsArray.length > 0) {
            return { array: idsArray, last: lastId };
        }
        return null;
    }
    async generateArrayOfValuesDesconto(descontoTDO, totalItens) {
        let desconto = descontoTDO.percentual / totalItens[0][0].total;
        let descontoArray = [];
        let divisaoFormatada = Number.parseFloat(abnt.arredonda(desconto));
        for (let i = 0; i < totalItens[0][0].total; i++) {
            if (i === totalItens[0][0].total - 1) {
                var soma = descontoArray.reduce(function (soma, i) {
                    return soma + i;
                });
                let difBeetween = descontoTDO.percentual - soma;
                console.log(difBeetween);
                descontoArray.push(Number.parseFloat(abnt.arredonda(difBeetween)));
            }
            else {
                descontoArray.push(divisaoFormatada);
            }
        }
        var soma = descontoArray.reduce(function (soma, i) {
            return soma + i;
        });
        try {
            const numeroArredondado = abnt.arredonda(soma);
            return { array: descontoArray, soma: Number.parseFloat(abnt.arredonda(numeroArredondado)), first: descontoArray[0], last: descontoArray[descontoArray.length - 1] };
        }
        catch (e) {
            console.log("Ocorreu um erro ao arredondar o numero: ", e.message);
            return null;
        }
    }
    async generateArrayOfValues(descontoTDO, totalItens) {
        let frete = descontoTDO.frete / totalItens[0][0].total;
        let freteArray = [];
        let format1 = Number.parseFloat(abnt.arredonda(frete));
        for (let i = 0; i < totalItens[0][0].total; i++) {
            if (i === totalItens[0][0].total - 1) {
                var soma = freteArray.reduce(function (soma, i) {
                    return soma + i;
                });
                let difBeetween = descontoTDO.frete - soma;
                freteArray.push(Number.parseFloat(abnt.arredonda(difBeetween)));
            }
            else {
                freteArray.push(format1);
            }
        }
        var soma = freteArray.reduce(function (soma, i) {
            return soma + i;
        });
        try {
            const numeroArredondado = abnt.arredonda(soma);
            return { array: freteArray, soma: Number.parseFloat(abnt.arredonda(numeroArredondado)), first: freteArray[0], last: freteArray[freteArray.length - 1] };
        }
        catch (e) {
            console.log("Ocorreu um erro ao arredondar o numero: ", e.message);
            return null;
        }
    }
    async calcularTotalItens(dados) {
        let valorTotalTodosProdutos = 0;
        for (let i in dados) {
            valorTotalTodosProdutos += dados[i].valor;
        }
        return valorTotalTodosProdutos;
    }
    async calcularDiff(descontoTDO, itens) {
        let percentualBody = descontoTDO.percentual;
        let valorTotalTodosProdutos = 0;
        for (let i in itens) {
            valorTotalTodosProdutos += itens[i].valordoproduto;
        }
        if (descontoTDO.tipo === enuns_1.TipoDesconto.VALOR) {
            percentualBody = percent(descontoTDO.percentual).of(valorTotalTodosProdutos);
        }
        percentualBody = abnt.arredonda(percentualBody);
        itens.forEach((item, index) => {
            const value = (percent(percentualBody).from(item.valordoproduto));
            itens[index].desconto = abnt.arredonda(value);
        });
        let valorTotalTodosDesconto = 0;
        for (let i in itens) {
            valorTotalTodosDesconto += itens[i].desconto;
        }
        const descontoSomado = Number.parseFloat(abnt.arredonda(valorTotalTodosDesconto));
        const descontoParametro = abnt.arredonda(percent(percentualBody).from(valorTotalTodosProdutos));
        console.log('total desconto somado', descontoSomado);
        console.log('total desconto', Number.parseFloat(abnt.arredonda(descontoParametro)));
        const diff = (abnt.arredonda(descontoParametro - descontoSomado));
        console.log(diff);
        console.log("percentual;", percentualBody);
        itens[itens.length - 1].desconto = abnt.arredonda(itens[itens.length - 1].desconto + diff);
        const descontoFinal = Number.parseFloat(abnt.arredonda(percent(percentualBody).from(valorTotalTodosProdutos)));
        const diffBettween = descontoFinal - (valorTotalTodosDesconto);
        valorTotalTodosDesconto = 0;
        for (let i in itens) {
            valorTotalTodosDesconto += itens[i].desconto;
        }
        console.log("total depois", valorTotalTodosDesconto);
        let freteArray = [];
        try {
            const numeroArredondado = abnt.arredonda(valorTotalTodosProdutos);
            return { array: freteArray, soma: Number.parseFloat(abnt.arredonda(numeroArredondado)), first: freteArray[0], last: freteArray[freteArray.length - 1] };
        }
        catch (e) {
            console.log("Ocorreu um erro ao arredondar o numero: ", e.message);
            return null;
        }
    }
};
UtilService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [price_service_1.PriceService])
], UtilService);
exports.UtilService = UtilService;
//# sourceMappingURL=util.service.js.map