import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClienteService } from 'src/cliente/cliente.service';
import { CotacaoService } from 'src/cotacao/cotacao.service';
import * as types from 'src/models/types';
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
		const totalDesconto = await this.priceService.calcularTotalDesconto(body);
		return [await this.priceService.getItensCotacao(codCotacao, codFornecedor, codContrato, codEmpresa), total, totalDesconto, frete];
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
}
