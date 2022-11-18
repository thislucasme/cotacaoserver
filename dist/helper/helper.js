"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcularDiferencaDesconto = void 0;
const enuns_1 = require("../enuns/enuns");
const types_1 = require("../models/types");
const percentual = require("percent-value");
const ABNT_5891_1977 = require('arredondamentoabnt').ABNT_5891_1977;
const abnt = new ABNT_5891_1977(2);
function calcularDiferencaDesconto(itensTyped, descontoTDO) {
    let totalCusto = 0;
    itensTyped.forEach((item) => {
        totalCusto += item.valordoproduto;
    });
    let percentualBody = descontoTDO.percentual;
    let percentualFrete = descontoTDO.frete;
    percentualFrete = (descontoTDO.frete / totalCusto) * 100;
    if (descontoTDO.tipo === enuns_1.TipoDesconto.VALOR) {
        percentualBody = (descontoTDO.percentual / totalCusto) * 100;
    }
    let maiorDescontoIndex = null;
    let maiorFreteIndex = null;
    const arrayDesconto = [];
    const arrayFrete = [];
    itensTyped.forEach((element) => {
        console.log();
        arrayDesconto.push(element.desconto === null ? 0 : element.desconto);
        arrayFrete.push(element.frete);
    });
    const maiorDesconto = Math.max(...itensTyped.map((o) => {
        return o.desconto;
    }), 0);
    const maiorFrete = Math.max(...itensTyped.map((o) => {
        return o.frete;
    }), 0);
    maiorDescontoIndex = arrayDesconto.indexOf(maiorDesconto);
    maiorFreteIndex = arrayFrete.indexOf(maiorFrete);
    console.log("maior", itensTyped[maiorDescontoIndex]);
    itensTyped.forEach((item, index) => {
        const custoItem = item.valordoproduto;
        const percentual = (percentualBody) / 100;
        const descontoFinal = Number.parseFloat(abnt.arredonda(percentual * custoItem));
        itensTyped[index].desconto = descontoFinal;
        const frete = (percentualFrete) / 100;
        const freteFinal = Number.parseFloat(abnt.arredonda(frete * custoItem));
        itensTyped[index].frete = freteFinal;
    });
    let somaDesconto = 0;
    itensTyped.forEach((item) => {
        somaDesconto += item.desconto;
    });
    let somaFrete = 0;
    itensTyped.forEach((item) => {
        somaFrete += item.frete;
    });
    const percent = (percentualBody) / 100;
    const descontoFinal = Number.parseFloat(abnt.arredonda(percent * totalCusto));
    const percentFrete = (percentualFrete) / 100;
    const freteFinal = Number.parseFloat(abnt.arredonda(percentFrete * totalCusto));
    const diffBettween = abnt.arredonda(descontoFinal - (abnt.arredonda(somaDesconto)));
    const diffBettweenFrete = abnt.arredonda(freteFinal - (abnt.arredonda(somaFrete)));
    console.log("diffeBetween frete", abnt.arredonda(diffBettweenFrete));
    console.log("ultimo índice frete", abnt.arredonda(itensTyped[itensTyped.length - 1].frete + diffBettweenFrete));
    let sun = 0;
    itensTyped.forEach((item, index) => {
        sun += item.desconto;
    });
    let sunFrete = 0;
    itensTyped.forEach((item) => {
        sunFrete += item.frete;
    });
    console.log('soma desconto cada item frete', sunFrete);
    console.log("percentual frete", percentualFrete);
    console.log("calculando diferença do total de frete com o frete do parametro");
    console.log("sunFretre()", sunFrete);
    const diferencaFrete = sunFrete - descontoTDO.frete;
    if (descontoTDO.tipo === enuns_1.TipoDesconto.VALOR) {
        const diferencaDesconto = sun - descontoTDO.percentual;
        itensTyped[maiorDescontoIndex].desconto = itensTyped[maiorDescontoIndex].desconto - Number.parseFloat(diferencaDesconto.toFixed(2));
    }
    if (descontoTDO.tipo === enuns_1.TipoDesconto.PERCENTUAL) {
        const porcentagem = percentual(descontoTDO.percentual).from(totalCusto);
        const diferencaDesconto = sun - Number.parseFloat(porcentagem.toFixed(2));
        itensTyped[maiorDescontoIndex].desconto = itensTyped[maiorDescontoIndex].desconto - Number.parseFloat(diferencaDesconto.toFixed(2));
    }
    console.log("frete parametro", descontoTDO.frete);
    console.log(Number.parseFloat(diferencaFrete.toFixed(2)));
    console.log("desconto", sun, "custo total", totalCusto);
    itensTyped[maiorFreteIndex].frete = itensTyped[maiorFreteIndex].frete - Number.parseFloat(diferencaFrete.toFixed(2));
    return itensTyped;
}
exports.calcularDiferencaDesconto = calcularDiferencaDesconto;
//# sourceMappingURL=helper.js.map