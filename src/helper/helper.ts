import { TipoDesconto } from "src/enuns/enuns";
import { DescontoTDO, ItemCotacaoTDO } from "src/models/types";

const percentual = require("percent-value")

const ABNT_5891_1977 = require('arredondamentoabnt').ABNT_5891_1977
const abnt = new ABNT_5891_1977(2);

export function calcularDiferencaDesconto(itensTyped: ItemCotacaoTDO[], descontoTDO: DescontoTDO): ItemCotacaoTDO[] {
	//this.utilService.calcularDiff(descontoTDO, itensTyped)

	let totalCusto = 0;
	itensTyped.forEach((item: any) => {
		totalCusto += item.valordoproduto;
	});
	let percentualBody = descontoTDO.percentual;

	//transformando valor em percentual
	let percentualFrete = descontoTDO.frete;
	percentualFrete = (descontoTDO.frete / totalCusto) * 100;

	if (descontoTDO.tipo === TipoDesconto.VALOR) {
		percentualBody = (descontoTDO.percentual / totalCusto) * 100
	}

	let maiorDescontoIndex = null;
	let maiorFreteIndex = null;
	const arrayDesconto = []
	const arrayFrete = []

	itensTyped.forEach((element: ItemCotacaoTDO) => {
		arrayDesconto.push(element.desconto)
		arrayFrete.push(element.frete)
	});

	// var max = itensTyped.reduce(function (a, b, index) {
	// 	console.log(index)
	// 	return Math.max(a, b.valordoproduto);
	// }, -Infinity);
	// console.log("Treee", max)

	const maiorDesconto = Math.max(...itensTyped.map((o) => {
		return o.desconto
	}), 0);

	const maiorFrete = Math.max(...itensTyped.map((o) => {
		return o.frete
	}), 0);

	maiorDescontoIndex = arrayDesconto.indexOf(maiorDesconto)
	maiorFreteIndex = arrayFrete.indexOf(maiorFrete)

	console.log("maior", itensTyped[maiorDescontoIndex])

	//percorrer lista de itens aplicando o desconto já formatado nas normas da abnt

	itensTyped.forEach((item: any, index) => {
		// itensTyped[index].desconto = 100;
		//calcula o percentual, e arredonda para duas casas decimais conforme as normas da abnt
		const custoItem = item.valordoproduto;
		const percentual = (percentualBody) / 100;
		const descontoFinal = Number.parseFloat(abnt.arredonda(percentual * custoItem));

		//atribui o valor do desconto ao item

		itensTyped[index].desconto = descontoFinal;

		//calcula o percentual, e arredonda para duas casas decimais conforme as normas da abnt
		const frete = (percentualFrete) / 100;
		const freteFinal = Number.parseFloat(abnt.arredonda(frete * custoItem));
		itensTyped[index].frete = freteFinal;


	});
	//console.log(totalCusto)



	let somaDesconto = 0;
	itensTyped.forEach((item: any) => {
		somaDesconto += item.desconto;
	});

	let somaFrete = 0;
	itensTyped.forEach((item: any) => {
		somaFrete += item.frete;
	});
	// console.log(somaDesconto, totalCusto)


	const percent = (percentualBody) / 100;
	const descontoFinal = Number.parseFloat(abnt.arredonda(percent * totalCusto));
	// console.log("total custo dos itens:", totalCusto, "desconto:", descontoFinal, "totalcusto - desconto:", totalCusto - descontoFinal)
	// console.log("Desconto baseado no valorTotalCusto:", descontoFinal, "Desconto baseado na soma de descontos:", somaDesconto)


	const percentFrete = (percentualFrete) / 100;
	const freteFinal = Number.parseFloat(abnt.arredonda(percentFrete * totalCusto));
	// console.log("total custo dos itens:", totalCusto, "desconto:", descontoFinal, "totalcusto - desconto:", totalCusto - descontoFinal)
	// console.log("Desconto baseado no valorTotalCusto:", descontoFinal, "Desconto baseado na soma de descontos:", somaDesconto)


	const diffBettween = abnt.arredonda(descontoFinal - (abnt.arredonda(somaDesconto)));
	// console.log("diferença:", abnt.arredonda(diffBettween + somaDesconto))

	const diffBettweenFrete = abnt.arredonda(freteFinal - (abnt.arredonda(somaFrete)));
	// console.log("diferença:", abnt.arredonda(diffBettween + somaDesconto))

	//console.log("diffeBetween", abnt.arredonda(diffBettween))
	//console.log("ultimo índice", abnt.arredonda(itensTyped[itensTyped.length - 1].desconto + diffBettween))


	//itensTyped[itensTyped.length - 1].desconto = abnt.arredonda(itensTyped[itensTyped.length - 1].desconto + diffBettween);


	console.log("diffeBetween frete", abnt.arredonda(diffBettweenFrete))
	console.log("ultimo índice frete", abnt.arredonda(itensTyped[itensTyped.length - 1].frete + diffBettweenFrete))

	//itensTyped[itensTyped.length - 1].frete = abnt.arredonda(itensTyped[itensTyped.length - 1].frete + diffBettweenFrete);


	let sun = 0;
	itensTyped.forEach((item: any, index) => {
		sun += item.desconto

	});
	//console.log('soma desconto cada item', sun)
	//console.log("percentual", percentualBody)


	//comparar com o frete que vem no parametro

	let sunFrete = 0;
	itensTyped.forEach((item: any) => {
		sunFrete += item.frete

	});
	console.log('soma desconto cada item frete', sunFrete)
	console.log("percentual frete", percentualFrete)
	console.log("calculando diferença do total de frete com o frete do parametro")
	console.log("sunFretre()", sunFrete)
	const diferencaFrete = sunFrete - descontoTDO.frete;

	if (descontoTDO.tipo === TipoDesconto.VALOR) {
		const diferencaDesconto = sun - descontoTDO.percentual;
		itensTyped[maiorDescontoIndex].desconto = itensTyped[maiorDescontoIndex].desconto - Number.parseFloat(diferencaDesconto.toFixed(2))
	}


	if (descontoTDO.tipo === TipoDesconto.PERCENTUAL) {
		const porcentagem = percentual(descontoTDO.percentual).from(totalCusto)
		const diferencaDesconto = sun - Number.parseFloat(porcentagem.toFixed(2));
		itensTyped[maiorDescontoIndex].desconto = itensTyped[maiorDescontoIndex].desconto - Number.parseFloat(diferencaDesconto.toFixed(2))
	}


	console.log("frete parametro", descontoTDO.frete)
	console.log(Number.parseFloat(diferencaFrete.toFixed(2)))

	console.log("desconto", sun, "custo total", totalCusto)
	//itensTyped[itensTyped.length - 1].frete = itensTyped[itensTyped.length - 1].frete - Number.parseFloat(diferenca.toFixed(2))
	itensTyped[maiorFreteIndex].frete = itensTyped[maiorFreteIndex].frete - Number.parseFloat(diferencaFrete.toFixed(2))
	return itensTyped;
}

