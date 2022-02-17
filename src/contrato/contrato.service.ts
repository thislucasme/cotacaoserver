import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import knex, { Knex } from 'knex';
import { getOrCreateKnexInstance } from 'src/cliente/models/knexCache';
import { restaurar } from 'src/common/cripto';
import { CriptoService } from 'src/cripto/cripto.service';
import { DatabaseCotacaoService } from 'src/database/database-cotacao.service';
import { SiteSuccessDatabaseService } from 'src/database/site-success-database.service';
import { SuccessDatabaseService } from 'src/database/success-database.service';
import { Empresa } from './contrato.dto';

@Injectable()
export class ContratoService {

	constructor(
		private readonly configService: ConfigService,
		private readonly siteSuccessDatabase: SiteSuccessDatabaseService,
		private readonly cripto: CriptoService,
		private readonly successDatabase: SuccessDatabaseService,
		private readonly cotacaoServiceDatabase: DatabaseCotacaoService
	) {
		const chave = configService.get('chaveCripto');
		if (!chave) {
			throw new Error(
				'Chave de criptografia não configurada! configurar .env CHAVE_CRIPTO'
			)
		}
	}
	async verificaContrato(
		numero: string
	): Promise<{ codigo: string; status: string }> {



		const knex = await this.siteSuccessDatabase.getConnection()
		const registro = await knex('da37')
			.select({
				codigo: 'codigo17',
				status: 'status17',
			})
			.where('codigo17', numero)
			.first()
		if (!registro)
			throw new NotFoundException(`Contrato ${numero} não encontrado!`)

		const status = registro.status

		if (status === 'B')
			throw new ForbiddenException(`Contrato ${numero} bloqueado`)
		if (status === 'C')
			throw new ForbiddenException(`Contrato ${numero} cancelado`)
		if (status === 'S')
			throw new ForbiddenException(`Contrato ${numero} suspenso`)

		if (status === 'D' || status === 'P') return registro
		else
			throw new ForbiddenException(
				`Contrato ${numero} com status desconhecido!`
			)
	}

	async getContrato(codigo: string, codigoEmpresa: string) {
		const knex = this.cotacaoServiceDatabase.getConnection();
		const registro = await knex('da37')
			.leftJoin('da' + codigoEmpresa, 'da37.cliente17', `da${codigoEmpresa}.codigo1`)
			.whereNot('da37.status17', '=', 'C')
			.where('da37.codigo17', '=', codigo)
			.select({
				codigo: 'da37.codigo17',
				status: 'da37.status17',
				cliente: `da${codigoEmpresa}.nome1`,
				cnpj: `da${codigoEmpresa}.cgc1`,
			})
			.first()

		return {
			...registro,
			cnpj: await this.cripto.decriptar(registro.cnpj),
		}
	}

	async getDadosConexao(contrato: string) {
		const knex = await this.siteSuccessDatabase.getConnection()

		const registro = await knex('cfgw')
			.select([
				{
					servidor: knex.raw('hex(serbco)'),
					banco: knex.raw('hex(bcodad)'),
					usuario: knex.raw('hex(usebco)'),
					senha: knex.raw('hex( pasbco)'),
					porta: knex.raw('hex(porbco)'),
					dataSincronismo: knex.raw('hex(datsinbco)'),
				},
			])
			.where('tposer', 'SDC')
			.andWhere(knex.raw('hex(bcodad)'), '=', contrato)
			.andWhere('sr_deleted', '<>', 'T')
			.first() as any;

		//console.log(contrato)

		const registroRestauradoVazio = {
			servidor: null,
			banco: null,
			usuario: null,
			senha: null,
			porta: null,
		}

		if (!registro) return registroRestauradoVazio

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

	async getConexaoClienteCache(contrato: string) {

		const { codigo } = await this.verificaContrato(contrato)

		const dadosConexao = await this.getDadosConexao(codigo)
		if (!dadosConexao)
			throw new NotFoundException(
				'Dados de conexão com o banco de dados do cliente não encontrados!'
			)

		const knex = await getOrCreateKnexInstance(dadosConexao)

		return knex
	}

}
