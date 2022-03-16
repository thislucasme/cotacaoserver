import { Injectable } from '@nestjs/common';
import { ContratoService } from 'src/contrato/contrato.service';
import { CriptoService } from 'src/cripto/cripto.service';
import { CotacaoTDOPayload } from 'src/models/types';
import { FlagutilService } from './flagutil.service';

@Injectable()
export class FlagService {

	constructor(private contratoService: ContratoService, private flagServiceUtil: FlagutilService, private criptoService: CriptoService) { }

	async consultarFlags(cotacaoPayload: CotacaoTDOPayload) {

		const dadosEmpresa = await this.flagServiceUtil.getConexaoCliente(cotacaoPayload.contratoEmpresa);

		const codigo = await this.criptoService.publicDecript(cotacaoPayload.codigo, "Success2021");
		const fornecedor = await this.criptoService.publicDecript(cotacaoPayload.fornecedor, "Success2021");
		const empresa = await this.criptoService.publicDecript(cotacaoPayload.codigoEmpresa, "Success2021");


		const result = await dadosEmpresa.raw(
			`select dece.codigo6, dece.item6, deic.flagStatus as fornvenc6  from dece${empresa} as dece,
			deic${empresa} as deic where dece.codigo6 = deic.codigo6 and dece.item6 = deic.item6
			and dece.codigo6 = '${codigo}' and deic.forneced6 = '${fornecedor}'; `
		);
		return result[0];
	}
	async finalizarCotacao(cotacaoTDOPayload: CotacaoTDOPayload) {
		const knex = await this.flagServiceUtil.getConexaoCliente(cotacaoTDOPayload.contratoEmpresa);

		const codigoFornecedorDescript = await this.criptoService.publicDecript(cotacaoTDOPayload.fornecedor, "Success2021")
		const codigoCotacaoDescript = await this.criptoService.publicDecript(cotacaoTDOPayload.codigo, "Success2021")
		const codigoEmpresa = await this.criptoService.publicDecript(cotacaoTDOPayload.codigoEmpresa, "Success2021")


		//'AG000002'
		//'0000000001'
		try {
			const result = await knex.raw(
				`update dece${codigoEmpresa} as dece, deic${codigoEmpresa} as deic set deic.flagStatus= '${cotacaoTDOPayload.flag}' 
			where dece.codigo6 = deic.codigo6 and dece.item6 = deic.item6 and
			dece.codigo6 = '${codigoCotacaoDescript}' and deic.forneced6 = '${codigoFornecedorDescript}'; `
			);
			if (result[0].affectedRows == 0) {
				return { data: null, code: 404 };
			}
			console.log("Sucesso ao salvar")
			return result;

		} catch (e) {
			console.log("Ocorreu um erro")
			return { data: null, code: 400, error: e };
		}
	}
}
