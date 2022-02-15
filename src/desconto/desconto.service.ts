import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { restaurar } from 'src/common/cripto';
import { Empresa } from 'src/contrato/contrato.dto';
import { CriptoService } from 'src/cripto/cripto.service';
import { getOrCreateKnexInstance } from 'src/database/knexCache';
import { SiteSuccessDatabaseService } from 'src/database/site-success-database.service';
import { DescontoTDO } from 'src/models/types';
import { PriceService } from 'src/price/price.service';

const ABNT_5891_1977 = require('arredondamentoabnt').ABNT_5891_1977
const abnt = new ABNT_5891_1977(2);


@Injectable()
export class DescontoService {
	constructor(private readonly siteSuccessDatabase: SiteSuccessDatabaseService,
		private readonly cripto: CriptoService,
		private priceService: PriceService
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


	async adicionarDesconto(descontoTDO: DescontoTDO) {

		const knex1 = await this.getConexaoCliente(descontoTDO.dados.contratoEmpresa)
		const empresa = await this.cripto.publicDecript(descontoTDO.dados.codigoEmpresa, "Success2021")
		const fornecedor = await this.cripto.publicDecript(descontoTDO.dados.fornecedor, "Success2021")
		const codigoCotacao = await this.cripto.publicDecript(descontoTDO.dados.codigo, "Success2021")

		const result = await this.priceService.calcularTotal(descontoTDO.dados);
		const valorOriginal = result[0].total;
		const percentual = descontoTDO.percentual / 100;
		const valorAserDiminuido = (percentual * valorOriginal);
		const totalItens = await knex1.schema.raw(`select count(item6) as total from deic${empresa} where codigo6 = '${codigoCotacao}'  and forneced6 = '${fornecedor}';`);

		let totalParaCadaItem = 0;
		let frete = descontoTDO.frete / totalItens[0][0].total;

		//ajustar desconto
		let format1 = Number.parseFloat(abnt.arredonda(frete));
		let totalDesconto = format1 * totalItens[0][0].total;
		let diferenca = totalDesconto - descontoTDO.percentual;
		console.log("diferença em si:", diferenca)
		console.log('total desconto', totalDesconto, "diferença:", diferenca)
		console.log("correção:", totalDesconto - diferenca)


		if (descontoTDO.tipo === 'P') {
			totalParaCadaItem = valorAserDiminuido / totalItens[0][0].total;
		} else {
			totalParaCadaItem = descontoTDO.percentual / totalItens[0][0].total;
		}
		const response = await knex1.schema.raw(
			`update deic${empresa} as itens set desconto = ${totalParaCadaItem},
			despesa6 = ${frete}
				where codigo6 = '${codigoCotacao}'  and forneced6 = '${fornecedor}'; `
		).then(result => {
			const affectedRows = result[0].affectedRows > 0;
			if (affectedRows) {
				return { statusCode: HttpStatus.CREATED, message: `201 Created`, success: true, totalCamposAtualizados: result[0].affectedRows }
			} else {
				return { statusCode: HttpStatus.BAD_REQUEST, message: `400 bad request `, success: false, totalCamposAtualizados: result[0].affectedRows }
			}
		}).catch(error => {
			return { statusCode: HttpStatus.BAD_REQUEST, message: `400 bad request `, success: false, totalCamposAtualizados: result[0].affectedRows }
		});
		return response;
	}

	ajustarDesconto() {

	}
}
