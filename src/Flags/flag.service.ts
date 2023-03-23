import { Injectable } from '@nestjs/common';
import { ContratoService } from 'src/contrato/contrato.service';
import { CriptoService } from 'src/cripto/cripto.service';
import { CotacaoTDOPayload } from 'src/models/types';
import { createTableNameWithBoolean } from 'src/util/util';
import { FlagutilService } from './flagutil.service';

@Injectable()
export class FlagService {

	constructor(private contratoService: ContratoService, private flagServiceUtil: FlagutilService, private criptoService: CriptoService) { }

	async consultarFlags(cotacaoPayload: CotacaoTDOPayload, compartilhada: boolean) {

		const dadosEmpresa = await this.flagServiceUtil.getConexaoCliente(cotacaoPayload.contratoEmpresa);

		const codigo = await this.criptoService.publicDecript(cotacaoPayload.codigo, "Success2021");
		const fornecedor = await this.criptoService.publicDecript(cotacaoPayload.fornecedor, "Success2021");
		const empresa = await this.criptoService.publicDecript(cotacaoPayload.codigoEmpresa, "Success2021");

		const dece = createTableNameWithBoolean(
			'dece',
			empresa,
			compartilhada);

		const deic = createTableNameWithBoolean(
			'deic',
			empresa,
			compartilhada);
		const result = await dadosEmpresa.raw(
			`select dece.codigo6, dece.item6, deic.stasinc6  as fornvenc6  from ${dece} as dece,
			${deic} as deic where dece.codigo6 = deic.codigo6 and dece.item6 = deic.item6
			and dece.codigo6 = '${codigo}' and deic.forneced6 = '${fornecedor}'; `
		);
		return result[0];
	}
	async isBloqueado(cotacaoPayload: CotacaoTDOPayload, compartilhada: boolean) {

		const dadosEmpresa = await this.flagServiceUtil.getConexaoCliente(cotacaoPayload.contratoEmpresa);

		const codigo = await this.criptoService.publicDecript(cotacaoPayload.codigo, "Success2021");
		const fornecedor = await this.criptoService.publicDecript(cotacaoPayload.fornecedor, "Success2021");
		const empresa = await this.criptoService.publicDecript(cotacaoPayload.codigoEmpresa, "Success2021");

		const dece = createTableNameWithBoolean(
			'dece',
			empresa,
			compartilhada);

		const deic = createTableNameWithBoolean(
			'deic',
			empresa,
			compartilhada);
		const [[{ status }]] = await dadosEmpresa.raw(
			`select dece.flag6 as status from ${dece} as dece,
			${deic} as deic where dece.codigo6 = deic.codigo6 and dece.item6 = deic.item6
			and dece.codigo6 = '${codigo}' and deic.forneced6 = '${fornecedor}' limit 1; `
		);
		return {status};
	}
	async finalizarCotacao(cotacaoTDOPayload: CotacaoTDOPayload, compartilhada: boolean) {
		const knex = await this.flagServiceUtil.getConexaoCliente(cotacaoTDOPayload.contratoEmpresa);

		const codigoFornecedorDescript = await this.criptoService.publicDecript(cotacaoTDOPayload.fornecedor, "Success2021")
		const codigoCotacaoDescript = await this.criptoService.publicDecript(cotacaoTDOPayload.codigo, "Success2021")
		const codigoEmpresa = await this.criptoService.publicDecript(cotacaoTDOPayload.codigoEmpresa, "Success2021")
		const dece = createTableNameWithBoolean(
			'dece',
			codigoEmpresa,
			compartilhada);

		const deic = createTableNameWithBoolean(
			'deic',
			codigoEmpresa,
			compartilhada);

		//'AG000002'
		//'0000000001'
		try {
			const result = await knex.raw(
				`update ${dece} as dece, ${deic} as deic set deic.stasinc6 = '${cotacaoTDOPayload.flag}' 
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
