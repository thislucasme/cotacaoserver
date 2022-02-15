import { Injectable, NotFoundException } from '@nestjs/common';
import e from 'express';
import { restaurar } from 'src/common/cripto';
import { Empresa } from 'src/contrato/contrato.dto';
import { CriptoService } from 'src/cripto/cripto.service';
import { getOrCreateKnexInstance } from 'src/database/knexCache';
import { SiteSuccessDatabaseService } from 'src/database/site-success-database.service';
import { CotacaoTDOPayload } from 'src/models/types';
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
		const empresa = await this.cripto.publicDecript(codigoEmpresa, "Success2021");

		//const dadosEmpresa = await this.contratoService.getDadosConexao('1EDFFA7D75A6');

		const knex = await this.getConexaoCliente(contrato)

		// Aqui um exemplo de usar um objeto no select, acho que a sintaxe fica mais limpa
		const result = await knex('deic' + empresa)
			.leftJoin('dece' + empresa,
				(k) => k.on(`dece${empresa}.codigo6`, `deic${empresa}.codigo6`).andOn(`dece${empresa}.item6`, `deic${empresa}.item6`)
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
					codbarras: 'deic01.codfabric6',
					formapagamento: 'deic01.formaPagamento'
				}
			).debug(false)


		const array: Array<any> = result;
		return [array];
	}

	async calcularFrete(cotacaoPayLoad: CotacaoTDOPayload) {

		const codigoCotacao = await this.cripto.publicDecript(cotacaoPayLoad.codigo, "Success2021");
		const codigoFornecedor = await this.cripto.publicDecript(cotacaoPayLoad.fornecedor, "Success2021");

		//const dadosEmpresa = await this.contratoService.getDadosConexao('1EDFFA7D75A6');

		const knex = await this.getConexaoCliente(cotacaoPayLoad.contratoEmpresa)

		const result = await knex.raw(
			`select ifnull(sum(despesa6), 0) as totalFrete  from dece01 as dece,
			deic01 as deic where dece.codigo6 = deic.codigo6 and dece.item6 = deic.item6 and
			dece.codigo6 = '${codigoCotacao}' and deic.forneced6 = '${codigoFornecedor}'; `
		);
		return result[0];

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

	async calcularTotalDesconto(cotacaoPayLoad: CotacaoTDOPayload) {

		const codigoCotacao = await this.cripto.publicDecript(cotacaoPayLoad.codigo, "Success2021");
		const codigoFornecedor = await this.cripto.publicDecript(cotacaoPayLoad.fornecedor, "Success2021");

		//const dadosEmpresa = await this.contratoService.getDadosConexao('1EDFFA7D75A6');

		const knex = await this.getConexaoCliente(cotacaoPayLoad.contratoEmpresa)

		const result = await knex.raw(
			`select ifnull(sum(deic.desconto), 0) as totalDesconto  from dece01 as dece,
			deic01 as deic where dece.codigo6 = deic.codigo6 and dece.item6 = deic.item6 and
			dece.codigo6 = '${codigoCotacao}' and deic.forneced6 = '${codigoFornecedor}'; `
		);
		this.arredondar();
		return result[0];
	}

	arredondar() {
		let numero1 = 4.303;
		let numero2 = 15.4875;
		let numero3 = 25.7750;
		let numero4 = 31.7250;

		let divisaoFrete = 1.0769230769230769;

		let format1 = Number.parseFloat(abnt.arredonda(numero1));
		let format2 = Number.parseFloat(abnt.arredonda(numero2));
		let format3 = Number.parseFloat(abnt.arredonda(numero3));
		let format4 = Number.parseFloat(abnt.arredonda(numero4));
		let format5 = Number.parseFloat(abnt.arredonda(divisaoFrete.toFixed(2)));

		console.log(numero1, " ==> ", format1)
		console.log(numero2, " ==> ", format2)
		console.log(numero3, " ==> ", format3)
		console.log(numero4, " ==> ", format4)
		console.log(divisaoFrete, " ==> ", format5)

	}

}
