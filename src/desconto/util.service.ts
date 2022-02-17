import { Injectable } from '@nestjs/common';
import { DescontoTDO, GeneratedData, GenerateIdDataByArray } from 'src/models/types';
import { PriceService } from 'src/price/price.service';
const ABNT_5891_1977 = require('arredondamentoabnt').ABNT_5891_1977
const abnt = new ABNT_5891_1977(2);

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
}
