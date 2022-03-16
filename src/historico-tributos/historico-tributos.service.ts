import { Injectable } from '@nestjs/common';
import { ContratoService } from 'src/contrato/contrato.service';
import { CriptoService } from 'src/cripto/cripto.service';
import { HistoricoProdutosParametro } from 'src/models/types';

@Injectable()
export class HistoricoTributosService {
	constructor(private contratoService: ContratoService, private criptoService: CriptoService) { }
	async buscarHistoricoBy(body: HistoricoProdutosParametro) {

		const knex = await this.contratoService.getConexaoCliente(body.contratoEmpresa)
		const fornecedor = await this.criptoService.publicDecript(body.fornecedor, "Success2021");
		const numeroEmpresa = await this.criptoService.publicDecript(body.numeroEmpresa, "Success2021");

		try {
			const result = await knex(`deh3${numeroEmpresa}`).select(
				[
					'produto6 as produto',
					'fornecedo6 as fornecedor',
					'icms6 as icms',
					'icmsst6 as st',
					'ipi6 as ipi',
					'mva6 as mva',
					'data6 as data'
				]
			).where('fornecedo6', fornecedor).andWhere('produto6', '=', body.produto6).orderBy('data6', 'desc').limit(1)

			return result;
		} catch (e) {
			console.log(e)
			return e
		}
	}
}
