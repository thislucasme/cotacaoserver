import { Injectable, NotFoundException } from '@nestjs/common';
import { restaurar } from 'src/common/cripto';
import { Empresa } from 'src/contrato/contrato.dto';
import { CriptoService } from 'src/cripto/cripto.service';
import { getOrCreateKnexInstance } from 'src/database/knexCache';
import { SiteSuccessDatabaseService } from 'src/database/site-success-database.service';
import { CotacaoTDOPayload } from 'src/models/types';

@Injectable()
export class PriceService {
	constructor(private readonly siteSuccessDatabase: SiteSuccessDatabaseService,
		private readonly cripto: CriptoService,
	) { }

	async getDados() {
		const knex = await this.siteSuccessDatabase.getConnection();
		const registro = await knex('cfgw').select();
		return registro;
	}

	async getDadosConexaoCache(contrato: string) {

		const knext = await this.siteSuccessDatabase.getConnection()

		const registro = await knext('cfgw')
			.select([
				{
					servidor: knext.raw('hex(serbco)'),
					banco: knext.raw('hex(bcodad)'),
					usuario: knext.raw('hex(usebco)'),
					senha: knext.raw('hex( pasbco)'),
					porta: knext.raw('hex(porbco)'),
					dataSincronismo: knext.raw('hex(datsinbco)'),
				},
			])
			.where('tposer', 'SDC')
			.andWhere(knext.raw('hex(bcodad)'), '=', contrato)
			.andWhere('sr_deleted', '<>', 'T')
			.first() as any;

		if (!registro) return;

		const registroRestaurado = {
			servidor: (await this.cripto.decriptar(registro.servidor)).trimEnd(),
			banco: (await this.cripto.decriptar(registro.banco)).trimEnd(),
			usuario: (await this.cripto.decriptar(registro.usuario)).trimEnd(),
			senha: (await this.cripto.decriptar(registro.senha)).trimEnd(),
			porta: (await this.cripto.decriptar(registro.porta)).trimEnd(),
			servidorHex: registro.servidor,
			bcohex: registro.banco,
			dataSincronismo: (
				await this.cripto.decriptar(registro.dataSincronismo)
			).trimEnd(),
		}

		return registroRestaurado
	}


	async getConexaoCliente(contrato: string) {
		//const contratoDescirptogrado = await this.cripto.publicDecript(contrato, "Success2021");
		//const { codigo } = await this.verificaContrato(contratoDescirptogrado)
		const dadosConexao = await this.getDadosConexaoCache(contrato)
		if (!dadosConexao)
			throw new NotFoundException(
				'Dados de conexão com o banco de dados do cliente não encontrados!'
			)

		const knex = await getOrCreateKnexInstance(dadosConexao)

		return knex
	}

	async getEmpresas(contrato: string) {
		const knex = await this.getConexaoCliente(contrato)

		const empresas = await knex('pe01').select([
			'codigo',
			'razao',
			'empresa',
			'cgc',
		])

		const parsedEmpresas: Empresa[] = empresas.map(empresa => ({
			codigo: empresa.codigo,
			razao: restaurar(empresa.razao),
			empresa: restaurar(empresa.empresa),
			cnpj: empresa.cgc,
			cidade: empresa.cidade
		}))

		return parsedEmpresas
	}


	async getItensCotacao(codCotacao: string, codFornecedor: string, contrato: string, codigoEmpresa: string) {



		const codigoCotacao = await this.cripto.publicDecript(codCotacao, "Success2021");
		const codigoFornecedor = await this.cripto.publicDecript(codFornecedor, "Success2021");

		//const dadosEmpresa = await this.contratoService.getDadosConexao('1EDFFA7D75A6');

		const knex = await this.getConexaoCliente(contrato)

		console.log(codigoCotacao, codigoFornecedor)


		// Aqui um exemplo de usar um objeto no select, acho que a sintaxe fica mais limpa
		const result = await knex('deic01')
			.leftJoin('dece01',
				(k) => k.on('dece01.codigo6', 'deic01.codigo6').andOn('dece01.item6', 'deic01.item6')
			)
			.where('deic01.forneced6', codigoFornecedor)
			.andWhere('deic01.codigo6', codigoCotacao)
			.select(
				{
					//Aqui você termina de colocar as colunas que você quer, lembrando que como tem um join tem que incluir o nome da tabela antes
					quantidade: 'dece01.qtd6',
					marca: 'dece01.marca6',
					descricao: 'dece01.descricao6',
					data: 'deic01.data6',
					codigo: 'deic01.codigo6',
					item: 'deic01.item6',
					produto: 'deic01.produto6',
					valordoproduto: 'deic01.custo6',
					frete: 'deic01.despesa6',
					st: 'deic01.icmsst6',
					icms: 'deic01.icms6',
					ipi: 'deic01.ipi6',
					mva: 'deic01.mva6',
					codbarras: 'deic01.codfabric6'
				}
			).debug(true)


		const array: Array<any> = result;
		return [array];
	}


	async calcularTotal(cotacaoPayLoad: CotacaoTDOPayload) {

		const codigoCotacao = await this.cripto.publicDecript(cotacaoPayLoad.codigo, "Success2021");
		const codigoFornecedor = await this.cripto.publicDecript(cotacaoPayLoad.fornecedor, "Success2021");

		//const dadosEmpresa = await this.contratoService.getDadosConexao('1EDFFA7D75A6');

		const knex = await this.getConexaoCliente(cotacaoPayLoad.contratoEmpresa)

		const result = await knex.raw(
			`select ifnull(sum(deic.custo6 * dece.qtd6 + ifnull(deic.despesa6, 0)), 0) as total  from dece01 as dece,
			deic01 as deic where dece.codigo6 = deic.codigo6 and dece.item6 = deic.item6 and
			dece.codigo6 = '${codigoCotacao}' and deic.forneced6 = '${codigoFornecedor}'; `
		);
		return result[0];
	}

}
