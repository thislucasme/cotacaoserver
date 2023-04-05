import { Injectable, NotFoundException } from '@nestjs/common';
import e from 'express';
import { restaurar } from 'src/common/cripto';
import { Empresa } from 'src/contrato/contrato.dto';
import { CriptoService } from 'src/cripto/cripto.service';
import { getOrCreateKnexInstance } from 'src/database/knexCache';
import { SiteSuccessDatabaseService } from 'src/database/site-success-database.service';
import { CotacaoTDOPayload } from 'src/models/types';
import { createTableNameWithBoolean, retornaAliquotas } from 'src/util/util';
const ABNT_5891_1977 = require('arredondamentoabnt').ABNT_5891_1977
const abnt = new ABNT_5891_1977(2);
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

	async getEmpresas(contrato: string, codigoEmpresa: string) {
		const knex = await this.getConexaoCliente(contrato)

		const empresas = await knex('pe' + codigoEmpresa).select([
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

	async getNome(codCotacao: string, codFornecedor: string, contrato: string, codigoEmpresa: string, compartilhada: boolean) {

		const codigoCotacao = await this.cripto.publicDecript(codCotacao, "Success2021");
		// const contratoE = await this.cripto.publicDecript(contrato, "Success2021");
		// console.log(contratoE)
		const codigoFornecedor = await this.cripto.publicDecript(codFornecedor, "Success2021");
		const empresa = await this.cripto.publicDecript(codigoEmpresa, "Success2021");

		//const dadosEmpresa = await this.contratoService.getDadosConexao('1EDFFA7D75A6');

		const dece = createTableNameWithBoolean(
			'dece',
			empresa,
			compartilhada);

		const deic = createTableNameWithBoolean(
			'deic',
			empresa,
			compartilhada);

		const knex = await this.getConexaoCliente(contrato)

		// Aqui um exemplo de usar um objeto no select, acho que a sintaxe fica mais limpa
		const query = knex(deic)
			.leftJoin(dece,
				(k) => k.on(`${dece}.codigo6`, `${deic}.codigo6`).andOn(`${dece}.item6`, `${deic}.item6`)
			)
			.leftJoin('ps01', `${dece}.usuario6`, 'ps01.codigo')
			.where(`${deic}.forneced6`, codigoFornecedor)
			.andWhere(`${deic}.codigo6`, codigoCotacao)
			.select(
				{
					//Aqui você termina de colocar as colunas que você quer, lembrando que como tem um join tem que incluir o nome da tabela antes

					usuario: knex.raw(`hex(ps01.usuario)`)

				}
			).debug(false).limit(1)

		const result = await query;


		const array: Array<any> = result;
		const nomeDescript = await this.cripto.publicDecript(array[0]?.usuario, "Success2021");
		return nomeDescript
	}
	async getItensCotacao(codCotacao: string, codFornecedor: string, contrato: string, codigoEmpresa: string, compartilhada: boolean) {

		const codigoCotacao = await this.cripto.publicDecript(codCotacao, "Success2021");
		// const contratoE = await this.cripto.publicDecript(contrato, "Success2021");
		// console.log(contratoE)
		const codigoFornecedor = await this.cripto.publicDecript(codFornecedor, "Success2021");
		const empresa = await this.cripto.publicDecript(codigoEmpresa, "Success2021");

		//const dadosEmpresa = await this.contratoService.getDadosConexao('1EDFFA7D75A6');

		const dece = createTableNameWithBoolean(
			'dece',
			empresa,
			compartilhada);

		const deic = createTableNameWithBoolean(
			'deic',
			empresa,
			compartilhada);

		const knex = await this.getConexaoCliente(contrato)

		// Aqui um exemplo de usar um objeto no select, acho que a sintaxe fica mais limpa
		const query = knex(deic)
			.leftJoin(dece,
				(k) => k.on(`${dece}.codigo6`, `${deic}.codigo6`).andOn(`${dece}.item6`, `${deic}.item6`)
			)
			.leftJoin('ps01', `${dece}.usuario6`, 'ps01.codigo')
			.where(`${deic}.forneced6`, codigoFornecedor)
			.andWhere(`${deic}.codigo6`, codigoCotacao)
			.select(
				{
					//Aqui você termina de colocar as colunas que você quer, lembrando que como tem um join tem que incluir o nome da tabela antes
					quantidade: `${dece}.qtd6`,
					marca: `${dece}.marca6`,
					descricao: `${dece}.descricao6`,
					data: `${deic}.data6`,
					codigo: `${deic}.codigo6`,
					item: `${deic}.item6`,
					produto: `${deic}.produto6`,
					valordoproduto: `${deic}.custo6`,
					frete: knex.raw(`ifnull(${deic}.despesa6, 0)`),
					st: knex.raw(`ifnull(${deic}.icmsst6, 0)`),
					icms: knex.raw(`ifnull(${deic}.icms6, 0)`),
					ipi: knex.raw(`ifnull(${deic}.ipi6, 0)`),
					mva: knex.raw(`ifnull(${deic}.mva6, 0)`),
					codbarras: `${deic}.codfabric6`,
					formapagamento: knex.raw(`ifnull(${deic}.forpag6, 0)`),
					desconto: knex.raw(`ifnull(${deic}.descont6, 0)`),
					observacao: `${deic}.observac6`,
					prazo: `${deic}.tempoent6`,
					formaPagamento: `${deic}.forpag6`,
					valorComTributo: knex.raw(
						`0`
					),
					status: knex.raw(`${dece}.flag6`),
					usuario: knex.raw(`hex(ps01.usuario)`)

				}
			)
		const result = await query;
		const dadosAtualizados = result.map(item => {
			return {
			  ...item,
			  valorComTributo:retornaAliquotas(item?.valordoproduto, item?.frete, item?.desconto, item?.ipi, item?.mva, item?.st, item?.quantidade)
			}
		  });
		const array: Array<any> = dadosAtualizados;
		return [array];
	}

	async calcularFrete(cotacaoPayLoad: CotacaoTDOPayload, compartilhada: boolean) {

		const codigoCotacao = await this.cripto.publicDecript(cotacaoPayLoad.codigo, "Success2021");
		const codigoFornecedor = await this.cripto.publicDecript(cotacaoPayLoad.fornecedor, "Success2021");
		const empresa = await this.cripto.publicDecript(cotacaoPayLoad.codigoEmpresa, "Success2021");


		//const dadosEmpresa = await this.contratoService.getDadosConexao('1EDFFA7D75A6');
		const dece = createTableNameWithBoolean(
			'dece',
			empresa,
			compartilhada);

		const deic = createTableNameWithBoolean(
			'deic',
			empresa,
			compartilhada);
		const knex = await this.getConexaoCliente(cotacaoPayLoad.contratoEmpresa)



		const result = await knex.raw(
			`select ifnull(sum(despesa6), 0) as totalFrete  from ${dece} as dece,
			${deic} as deic where dece.codigo6 = deic.codigo6 and dece.item6 = deic.item6 and
			dece.codigo6 = '${codigoCotacao}' and deic.forneced6 = '${codigoFornecedor}'; `
		);
		return result[0];

	}


	async calcularTotal(cotacaoPayLoad: CotacaoTDOPayload, buscarIds: boolean, compartilhada: boolean) {

		const codigoCotacao = await this.cripto.publicDecript(cotacaoPayLoad.codigo, "Success2021");
		const codigoFornecedor = await this.cripto.publicDecript(cotacaoPayLoad.fornecedor, "Success2021");
		const empresa = await this.cripto.publicDecript(cotacaoPayLoad.codigoEmpresa, "Success2021");

		//const dadosEmpresa = await this.contratoService.getDadosConexao('1EDFFA7D75A6');
		const dece = createTableNameWithBoolean(
			'dece',
			empresa,
			compartilhada);

		const deic = createTableNameWithBoolean(
			'deic',
			empresa,
			compartilhada);
		const knex = await this.getConexaoCliente(cotacaoPayLoad.contratoEmpresa)

		const result = await knex.raw(
			`select ifnull(sum( (deic.custo6 + deic.despesa6 + ((deic.custo6 + deic.despesa6 + ((deic.custo6 + deic.despesa6) * (deic.mva6 / 100))) * (deic.icmsst6 / 100)) + ((deic.custo6 + deic.despesa6) * (deic.ipi6 / 100)))* dece.qtd6), 0) as total   from ${dece} as dece,
			${deic} as deic where dece.codigo6 = deic.codigo6 and dece.item6 = deic.item6 and
			dece.codigo6 = '${codigoCotacao}' and deic.forneced6 = '${codigoFornecedor}'; `
		);

		if (buscarIds) {
			const ids = await knex.raw(
				`select deic.item6  from ${dece} as dece,
			${deic} as deic where dece.codigo6 = deic.codigo6 and dece.item6 = deic.item6 and
			dece.codigo6 = '${codigoCotacao}' and deic.forneced6 = '${codigoFornecedor}'; `
			);
			return [result[0][0], ids[0][0]];
		} else {
			return [result[0][0]];
		}
	}

	async calcularTotalDesconto(cotacaoPayLoad: CotacaoTDOPayload, compartilhada: boolean) {

		const codigoCotacao = await this.cripto.publicDecript(cotacaoPayLoad.codigo, "Success2021");
		const codigoFornecedor = await this.cripto.publicDecript(cotacaoPayLoad.fornecedor, "Success2021");
		const empresa = await this.cripto.publicDecript(cotacaoPayLoad.codigoEmpresa, "Success2021");

		//const dadosEmpresa = await this.contratoService.getDadosConexao('1EDFFA7D75A6');
		const dece = createTableNameWithBoolean(
			'dece',
			empresa,
			compartilhada);

		const deic = createTableNameWithBoolean(
			'deic',
			empresa,
			compartilhada);
		const knex = await this.getConexaoCliente(cotacaoPayLoad.contratoEmpresa)

		const result = await knex.raw(
			`select ifnull(sum(deic.descont6), 0) as totalDesconto  from ${dece} as dece,
			${deic} as deic where dece.codigo6 = deic.codigo6 and dece.item6 = deic.item6 and
			dece.codigo6 = '${codigoCotacao}' and deic.forneced6 = '${codigoFornecedor}'; `
		);
		return result[0];
	}
}
