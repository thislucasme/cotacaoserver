import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClienteService } from 'src/cliente/cliente.service';
import { CotacaoService } from 'src/cotacao/cotacao.service';
import * as types from 'src/models/types';
import { CotacaoTDOPayload } from 'src/models/types';
import { PriceService } from './price.service';

@Controller('price')
export class PriceController {
	constructor(private clienteService: ClienteService, private cotacaoService: CotacaoService, private priceService: PriceService) { }


	@Get('findby/:codCotacao/:codFornecedor/:codContrato/:codEmpresa')
	async getAllItensFromCotacao(
		@Param('codCotacao') codCotacao: string, @Param('codFornecedor')
		codFornecedor: string, @Param('codEmpresa') codEmpresa: string, @Param('codContrato') codContrato: string) {

		const body: types.CotacaoTDOPayload = {
			codigo: codCotacao,
			fornecedor: codFornecedor,
			flag: '',
			contratoEmpresa: codContrato,
			codigoEmpresa: codEmpresa
		}


		const total = await this.priceService.calcularTotal(body);
		const frete = await this.priceService.calcularFrete(body);
		const data = await this.priceService.getItensCotacao(codCotacao, codFornecedor, codContrato, codEmpresa)
		const totalDesconto = await this.priceService.calcularTotalDesconto(body);

		const dataTratado = data[0];
		let isReady = true;
		for (let i = 0; i < dataTratado.length; i++) {
			//	console.log(dados.marca)
			if (dataTratado[i]?.valordoproduto === 0 || dataTratado[i]?.valordoproduto === null) {
				isReady = false;
				break;
			}
		}

		return [data, total, totalDesconto, frete, [{ "isReady": isReady }]];
	}
	@Post('update')
	async updateItemCotacao(@Body() body: types.ItemCotacaoTDO) {
		try {
			const result = await this.cotacaoService.updateItemCotacao(body);
			return result;
		} catch (e) {
			return { error: e }
		}

	}

	@Get('ready-to-send')
	async readToSend(@Body() body: CotacaoTDOPayload) {
		try {
			const result = await this.cotacaoService.isAllPreenchido(body);
			return result;
		} catch (e) {
			return { error: e }
		}
	}
}
