import { Injectable } from '@nestjs/common';
import { TipoDesconto } from 'src/enuns/enuns';
import { DescontoTDO, GeneratedData, GenerateIdDataByArray, ItemCotacaoTDO } from 'src/models/types';
import { PriceService } from 'src/price/price.service';
const ABNT_5891_1977 = require('arredondamentoabnt').ABNT_5891_1977
const abnt = new ABNT_5891_1977(2);
const percent = require("percent-value")

@Injectable()
export class UtilService {
	constructor(private priceService: PriceService) { }

	async generateIdDataByArray(ids: any): Promise<GenerateIdDataByArray> | null {
		const idsArray = ids[0];
		const lastId = ids[0][idsArray.length - 1].item6;
		if (idsArray.length > 0) {
			return { array: idsArray, last: lastId };
		}
		return null;
	}

	async generateArrayOfValuesDesconto(descontoTDO: DescontoTDO, totalItens: any) {

		let desconto = descontoTDO.percentual / totalItens[0][0].total;
		let descontoArray: number[] = [];
		//ajustar desconto
		let divisaoFormatada = Number.parseFloat(abnt.arredonda(desconto));

		for (let i = 0; i < totalItens[0][0].total; i++) {
			if (i === totalItens[0][0].total - 1) {
				var soma = descontoArray.reduce(function (soma, i) {
					return soma + i;
				});

				let difBeetween = descontoTDO.percentual - soma;
				console.log(difBeetween)
				descontoArray.push(Number.parseFloat(abnt.arredonda(difBeetween)));
			} else {
				descontoArray.push(divisaoFormatada);

			}

		}
		//console.log(freteArray);
		var soma = descontoArray.reduce(function (soma, i) {
			return soma + i;
		});

		try {

			const numeroArredondado = abnt.arredonda(soma);
			return { array: descontoArray, soma: Number.parseFloat(abnt.arredonda(numeroArredondado)), first: descontoArray[0], last: descontoArray[descontoArray.length - 1] };
		} catch (e) {
			console.log("Ocorreu um erro ao arredondar o numero: ", e.message)
			return null;
		}
	}

	async generateArrayOfValues(descontoTDO: DescontoTDO, totalItens: any): Promise<GeneratedData> | null {


		let frete = descontoTDO.frete / totalItens[0][0].total;

		let freteArray: number[] = [];

		//ajustar desconto
		let format1 = Number.parseFloat(abnt.arredonda(frete));

		for (let i = 0; i < totalItens[0][0].total; i++) {
			if (i === totalItens[0][0].total - 1) {
				var soma = freteArray.reduce(function (soma, i) {
					return soma + i;
				});

				let difBeetween = descontoTDO.frete - soma;
				freteArray.push(Number.parseFloat(abnt.arredonda(difBeetween)));
			} else {
				freteArray.push(format1);

			}

		}

		//console.log(freteArray);
		var soma = freteArray.reduce(function (soma, i) {
			return soma + i;
		});

		try {

			const numeroArredondado = abnt.arredonda(soma);
			return { array: freteArray, soma: Number.parseFloat(abnt.arredonda(numeroArredondado)), first: freteArray[0], last: freteArray[freteArray.length - 1] };
		} catch (e) {
			console.log("Ocorreu um erro ao arredondar o numero: ", e.message)
			return null;
		}
	}

	async calcularTotalItens(dados: any[]) {
		let valorTotalTodosProdutos = 0;
		for (let i in dados) {
			valorTotalTodosProdutos += dados[i].valor
		}
		return valorTotalTodosProdutos;
	}

	async calcularDiff(descontoTDO: DescontoTDO, itens: any[]): Promise<GeneratedData> | null {

		/*Desconto em valor ou percentual */
		let percentualBody = descontoTDO.percentual;

		//calculando custo total dos itens
		let valorTotalTodosProdutos = 0;
		for (let i in itens) {
			valorTotalTodosProdutos += itens[i].valordoproduto
		}

		/*Verifica se o tipo do desconto é percentual ou valor. Ex: 0.5% ou B$ 07,45. Caso o tipo seja valor,
		é feito esse calculo para achar quanto por % o numero é do custo total dos itens. Ou seja, descobrir
		qual o percentual o valor representa da quantidade total dos itens.
		*/

		if (descontoTDO.tipo === TipoDesconto.VALOR) {
			percentualBody = percent(descontoTDO.percentual).of(valorTotalTodosProdutos);
		}

		//arredondar percentual conforme as normas da abnt
		percentualBody = abnt.arredonda(percentualBody)

		// console.log("===", percentualBody.toFixed(2), "===")

		//Percorrer o array de itens aplicando o desconto ex: custoItem - percentualDesconto

		itens.forEach((item: any, index: number) => {
			const value = (percent(percentualBody).from(item.valordoproduto));
			// console.log(value, percentualBody, item.valordoproduto)
			itens[index].desconto = abnt.arredonda(value)
		});

		//somar todos os descontos de cada item
		let valorTotalTodosDesconto = 0;
		for (let i in itens) {
			valorTotalTodosDesconto += itens[i].desconto
		}

		const descontoSomado = Number.parseFloat(abnt.arredonda(valorTotalTodosDesconto));
		const descontoParametro: number = abnt.arredonda(percent(percentualBody).from(valorTotalTodosProdutos));
		console.log('total desconto somado', descontoSomado)
		console.log('total desconto', Number.parseFloat(abnt.arredonda(descontoParametro)))
		const diff = (abnt.arredonda(descontoParametro - descontoSomado))
		console.log(diff)
		console.log("percentual;", percentualBody)

		itens[itens.length - 1].desconto = abnt.arredonda(itens[itens.length - 1].desconto + diff);
		//console.log(itens)


		//calcular diferença

		const descontoFinal = Number.parseFloat(abnt.arredonda(percent(percentualBody).from(valorTotalTodosProdutos)));
		const diffBettween = descontoFinal - (valorTotalTodosDesconto);
		//console.log(diffBettween, "diffBettween", descontoFinal)

		valorTotalTodosDesconto = 0;
		for (let i in itens) {
			valorTotalTodosDesconto += itens[i].desconto
		}
		console.log("total depois", valorTotalTodosDesconto)

		// console.log(percent(269).get(12))
		// console.log(itens)

		let freteArray: number[] = [];
		// console.log("valor total: ", valorTotalTodosProdutos)
		// console.log("quanto por cento ", descontoTDO.percentual, "é de: ", valorTotalTodosProdutos, "R:", percent(descontoTDO.percentual).of(valorTotalTodosProdutos))
		// console.log("acrescentar:", percent(valorTotalTodosProdutos).get(descontoTDO.percentual))
		// //ajustar desconto
		// console.log("soma:", valorTotalTodosProdutos, "Percentual:", percentualBody)

		try {

			const numeroArredondado = abnt.arredonda(valorTotalTodosProdutos);
			return { array: freteArray, soma: Number.parseFloat(abnt.arredonda(numeroArredondado)), first: freteArray[0], last: freteArray[freteArray.length - 1] };
		} catch (e) {
			console.log("Ocorreu um erro ao arredondar o numero: ", e.message)
			return null;
		}
	}
}
