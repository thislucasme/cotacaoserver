import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseCotacaoService } from 'src/database/database-cotacao.service';
import { ContratoService } from '../contrato/contrato.service';
import { MailerService } from '@nestjs-modules/mailer';
import { restaurar } from 'src/common/cripto';
import { Empresa } from 'src/contrato/contrato.dto';
import { createhtml } from 'src/util/util';
import { CotacaoTDOPayload, DadosSuccess, FornecedorData, ItemCotacaoTDO, PayloadEnvioEmail, PayloadSuccess } from 'src/models/types';
import knexfn from 'knex';
import { CriptoService } from 'src/cripto/cripto.service';

import { decode, encode } from 'base-64';
import { getOrCreateKnexInstance } from 'src/database/knexCache';

@Injectable()
export class CotacaoService {
	constructor(private readonly mailer: MailerService, private cotacaoDatabaseService: DatabaseCotacaoService, private contratoService: ContratoService, private criptoService: CriptoService) { }

	async buscarCotacoes(codFornecedor: string) {
		const knex = this.cotacaoDatabaseService.getConnection();
		const result = knex('deic01').select([
			'codigo6 as codigo',
		])
			.where('deic01.forneced6', codFornecedor)
			.distinct('codigo6').debug(true)
		return result;

	}
	async getItensCotacao(codCotacao: string, codFornecedor: string, contrato: string, codigoEmpresa: string) {

		const codigoCotacao = await this.criptoService.publicDecript(codCotacao, "Success2021");
		const codigoFornecedor = await this.criptoService.publicDecript(codFornecedor, "Success2021");

		//const dadosEmpresa = await this.contratoService.getDadosConexao('1EDFFA7D75A6');

		const knex = await this.contratoService.getConexaoCliente('1EDFFA7D75A6')

		// Aqui um exemplo de usar um objeto no select, acho que a sintaxe fica mais limpa
		const result = knex('deic01')
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
			)
		return result;
	}


	async getEmpresaByCodigo(codigo: string): Promise<Empresa | null> {
		const knex = this.cotacaoDatabaseService.getConnection();
		const result = await knex('pe01').select({
			codigo: 'codigo',
			razao: 'razao',
			empresa: 'empresa',
			cidade: 'cidade',
			cnpj: 'cgc'
		}).where('codigo', codigo).first()

		const empresa: Empresa = {
			codigo: result.codigo,
			razao: restaurar(result.razao),
			empresa: restaurar(result.empresa),
			cnpj: result.cnpj,
			cidade: result.cidade
		}

		return empresa;

	}

	async updateItemCotacao(itemCotacao: ItemCotacaoTDO) {

		const codigoFornecedor = await this.criptoService.publicDecript(itemCotacao.fornecedor, "Success2021");

		//const knex = await this.contratoService.getConexaoClienteCache('1EDFFA7D75A6');
		const knex1 = await this.contratoService.getConexaoCliente(itemCotacao.contratoEmpresa);

		//const result = knex1.schema.raw('select * from dece01');
		//return result;

		// const result = await knex1.schema.raw(
		// 	`UPDATE deic01, dece01 SET deic01.custo6 = ${itemCotacao.valorProduto},
		// 	deic01.mva6 = ${itemCotacao.mva},
		// 	deic01.formaPagamento = ${itemCotacao.formaPagamento},
		// 	deic01.datlan6 = '${itemCotacao.data}',
		// 	deic01.despesa6  = ${itemCotacao.frete}, deic01.icmsst6 = ${itemCotacao.st},
		// 	deic01.icms6 = ${itemCotacao.icms}, deic01.ipi6 = ${itemCotacao.ipi}
		// 	where deic01.forneced6 = '${codigoFornecedor}'
		// 	and deic01.item6 = '${itemCotacao.item}'
		// 	and dece01.item6 = '${itemCotacao.item}' and deic01.produto6 = '${itemCotacao.codigoInterno}' and dece01.produto6 = '${itemCotacao.codigoInterno}';`
		// )


		const result = await knex1.schema.raw(
			`select * from deic01;`
		)

		console.log(result)
		if (result[0].affectedRows < 1) {
			console.log(result[0].affectedRows)
			return { status: HttpStatus.NO_CONTENT, msg: "Erro ao atualizar o item" }
		}
		return { status: HttpStatus.CREATED, msg: "item atualizado com sucesso!" };
	}

	async enviarEmail() {
		const emailTask = await this.mailer.sendMail({
			to: "lucassilvaee1245@gmail.com",
			from: 'automatico@success.inf.br',
			subject: 'Código de acesso do Portal Cotações Success',
			html: createhtml('', null, ''),
			text: `
      Para acessar o Portal Cotações, digite o código abaixo no campo onde foi solicitado:
      teste2
      Por questões de segurança esse código expira após 10 minutos.`,
		})
		return emailTask
	}

	async sendEmailTo(email: string, url: string, empresa: Empresa, fornecedor: string) {
		const emailTask = await this.mailer.sendMail({
			to: email,
			from: 'automatico@success.inf.br',
			subject: 'Código de acesso do Portal Cotações Success',
			html: createhtml(url, empresa, fornecedor),
			text: `
      Para acessar o Portal Cotações, digite o código abaixo no campo onde foi solicitado:
      teste2
      Por questões de segurança esse código expira após 10 minutos.`,
		})
		return emailTask
	}

	async flagUpdate(cotacaoTDOPayload: CotacaoTDOPayload) {
		const knex = this.cotacaoDatabaseService.getConnection();
		const codigoFornecedorDescript = await this.criptoService.publicDecript(cotacaoTDOPayload.fornecedor, "Success2021")
		const codigoCotacaoDescript = await this.criptoService.publicDecript(cotacaoTDOPayload.codigo, "Success2021")
		const codigoEmpresa = await this.criptoService.publicDecript(cotacaoTDOPayload.codigoEmpresa, "Success2021")

		//'AG000002'
		//'0000000001'
		try {
			const result = await knex.raw(
				`update dece${codigoEmpresa} as dece, deic${codigoEmpresa} as deic set deic.fornvenc6= '${cotacaoTDOPayload.flag}' 
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
			return { data: null, code: 400 };
		}


	}
	async atualizarFlagVendedor(cotacaoTDOPayload: CotacaoTDOPayload) {
		const knex = this.cotacaoDatabaseService.getConnection();
		//'AG000002'
		//'0000000001'
		const result = await knex.raw(
			`update deic01, dece01 set dece01.flag6 = '${cotacaoTDOPayload.flag}',
			dece01.melcot16 = '${cotacaoTDOPayload.fornecedor}'
			where dece01.codigo6 = '${cotacaoTDOPayload.codigo}' and dece01.item6 = deic01.item6
			and deic01.forneced6 = '${cotacaoTDOPayload.fornecedor}';`
		);
		if (result[0].affectedRows == 0) {
			return null;
		}
		return result;
	}
	async consultarFlags(cotacaoPayload: CotacaoTDOPayload) {
		console.log("contrato empresa:" + cotacaoPayload.contratoEmpresa)
		const dadosEmpresa = await this.contratoService.getConexaoCliente('1EDFFA7D75A6');


		const result = await dadosEmpresa.raw(
			`select dece.codigo6, dece.item6, deic.fornvenc6  from dece01 as dece,
			deic01 as deic where dece.codigo6 = deic.codigo6 and dece.item6 = deic.item6
			and dece.codigo6 = '${cotacaoPayload.codigo}' and deic.forneced6 = '${cotacaoPayload.fornecedor}'; `
		);
		return result[0];
	}
	async calcularTotal(cotacaoPayLoad: CotacaoTDOPayload) {

		const codigoCotacao = await this.criptoService.publicDecript(cotacaoPayLoad.codigo, "Success2021");
		const codigoFornecedor = await this.criptoService.publicDecript(cotacaoPayLoad.fornecedor, "Success2021");

		const dadosEmpresa = await this.contratoService.getDadosConexao('1EDFFA7D75A6');

		const knex = knexfn({
			client: 'mysql2',
			connection: {
				host: dadosEmpresa.servidor,
				port: Number(dadosEmpresa.porta),
				user: dadosEmpresa.usuario,
				password: dadosEmpresa.senha,
				database: dadosEmpresa.banco
			}
		})
		const result = await knex.raw(
			`select ifnull(sum(deic.custo6 * dece.qtd6 + deic.despesa6), 0) as total  from dece01 as dece,
			deic01 as deic where dece.codigo6 = deic.codigo6 and dece.item6 = deic.item6 and
			dece.codigo6 = '${codigoCotacao}' and deic.forneced6 = '${codigoFornecedor}'; `
		);
		return result[0];
	}
	verificarTodosCampos(cotacaoPayLoad: any) {
		let status = true;
		cotacaoPayLoad?.forEach((element: any) => {
			const result = this.verificarCampo(element)
			if (!result) {
				status = result;
			}
		});
		return { status: status }

	}
	verificarCampo(dadosSuccess: DadosSuccess) {
		if (!dadosSuccess.cnpjFornecedor || !dadosSuccess.contratoEmpresaSucess || !dadosSuccess.numeroCotacao || !dadosSuccess.numeroEmpresa) {
			return false;
		}
		return true;
	}
	async enviarEmailParaFornecedores(dados: PayloadSuccess) {
		//buscar conexão, se conectar a ela
		const result = await this.contratoService.getDadosConexao(dados.empresa.contratoEmpresaSuccess);
		console.log("aqui")
		if (result.servidor === null) {
			const payloadEnvioEmail: PayloadEnvioEmail = {
				empresa: {
					contratoEmpresaSuccess: null,
					numeroCotacao: null,
					numeroEmpresa: null
				},
				fornecedores: []
			}
			return payloadEnvioEmail;
		}
		const knex = knexfn({
			client: 'mysql2',
			connection: {
				host: result.servidor,
				port: Number(result.porta),
				user: result.usuario,
				password: result.senha,
				database: result.banco
			}
		})

		const codigoCotacaoDescriptografado = await this.criptoService.publicDecript(dados.empresa.numeroCotacao, "Success2021");
		const codigoEmpresaDescriptografado = await this.criptoService.publicDecript(dados.empresa.numeroEmpresa, "Success2021");


		const cotacao = await knex.raw(`select codigo6 as codigo from dece${codigoEmpresaDescriptografado} where codigo6 =  '${codigoCotacaoDescriptografado}' and sr_deleted != 'T' limit 1;`);
		const snapshot = cotacao[0][0];
		if (snapshot) {
			console.log("Existe")
		} else {
			console.log("Não existe")
			const payloadEnvioEmail: PayloadEnvioEmail = {
				empresa: {
					contratoEmpresaSuccess: null,
					numeroCotacao: null,
					numeroEmpresa: null
				},
				fornecedores: []
			}
			return payloadEnvioEmail
		}
		console.log(cotacao[0][0], "cotação");
		const stringFornecedoresCriptografados: string[] = dados.fornecedores.cnpjFornecedor.split(' ');

		const payloadEnvioEmail: PayloadEnvioEmail = {
			empresa: {
				contratoEmpresaSuccess: dados.empresa.contratoEmpresaSuccess,
				numeroCotacao: dados.empresa.numeroCotacao,
				numeroEmpresa: dados.empresa.numeroEmpresa
			},
			fornecedores: []
		}
		//console.log(stringFornecedoresCriptografados[0])
		// const cnpjs: string = dados.fornecedores.cnpjFornecedor;

		// const fornecedores = cnpjs.split(' ');

		// const emails = [];
		console.log(stringFornecedoresCriptografados)
		for (const cnpj of stringFornecedoresCriptografados) {
			const raw = await knex.raw(`select hex(cgc2) as cnpj, nome2 as nome, email2 as email, codigo2 as codigoFornecedor from da02 where hex(cgc2) = '${cnpj}' limit 1`);
			const snapshot = raw[0][0];
			console.log("query", snapshot)
			const fornecedor: FornecedorData = {
				cnpj: cnpj,
				email: snapshot?.email ? snapshot?.email : null,
				enviado: false,
				url: null,
				codigoFornecedor: snapshot?.codigoFornecedor ? snapshot?.codigoFornecedor : "",
				nome: snapshot?.nome
			}
			payloadEnvioEmail.fornecedores.push(fornecedor);
		}

		// buscar razão social da empresa para gerar o html do email
		const numeroEmpresa = await this.criptoService.publicDecript(dados.empresa.numeroEmpresa, "Success2021");
		let empresa: Empresa;
		try {
			const empresaDB = await knex('pe01').select({
				codigo: 'codigo',
				razao: 'razao',
				empresa: 'empresa',
				cidade: 'cidade',
				cnpj: 'cgc'
			}).where('codigo', numeroEmpresa).first()

			empresa = {
				codigo: empresaDB.codigo,
				razao: restaurar(empresaDB.razao),
				empresa: restaurar(empresaDB.empresa),
				cnpj: empresaDB.cnpj,
				cidade: empresaDB.cidade
			}
		} catch (e) {
			console.log("Ocorreu um erro")
		}


		//payloadEnvioEmail.fornecedores[0] = fornecedor;

		for (let i = 0; i < payloadEnvioEmail.fornecedores.length; i++) {
			if (payloadEnvioEmail.fornecedores[i].email !== null) {

				//gerar o link
				const contratoEmpresa = (dados.empresa.contratoEmpresaSuccess + encode('-success'));
				const numeroEmpresa = (dados.empresa.numeroEmpresa + encode('-success'));
				const numeroCotacao = (dados.empresa.numeroCotacao + encode('-success'));
				const cnpjFornecedor = (payloadEnvioEmail.fornecedores[i].cnpj) + encode('-success');
				const codFornecedor = await this.criptoService.publicEncript((payloadEnvioEmail.fornecedores[i].codigoFornecedor), "Success2021")
				console.log(codFornecedor)
				const fullUrl = contratoEmpresa + numeroEmpresa + numeroCotacao + cnpjFornecedor + codFornecedor;

				const prefixUrl = 'http://localhost:3005/painel/cotacao/' + fullUrl;

				//await enviar email
				const envio = await this.sendEmailTo(payloadEnvioEmail.fornecedores[i].email, prefixUrl, empresa, payloadEnvioEmail.fornecedores[i].nome);
				const accepted = envio.accepted[0] === payloadEnvioEmail.fornecedores[i].email;
				const fornecedor: FornecedorData = {
					cnpj: payloadEnvioEmail.fornecedores[i].cnpj,
					email: payloadEnvioEmail.fornecedores[i].email,
					enviado: accepted,
					url: prefixUrl,
					codigoFornecedor: payloadEnvioEmail.fornecedores[i].codigoFornecedor,
					nome: ''
				}
				payloadEnvioEmail.fornecedores[i] = fornecedor;
				console.log("enviado")
			}
		}



		return payloadEnvioEmail;
	}


}
