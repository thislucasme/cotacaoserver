import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { encode } from 'base-64';
import knexfn from 'knex';
import * as moment from 'moment';
import { restaurar } from 'src/common/cripto';
import { Empresa } from 'src/contrato/contrato.dto';
import { CriptoService } from 'src/cripto/cripto.service';
import { DatabaseCotacaoService } from 'src/database/database-cotacao.service';
import { CotacaoTDOPayload, DadosSuccess, FornecedorData, PayloadEnvioEmail, PayloadSuccess } from 'src/models/types';
import { createhtml } from 'src/util/util';
import { ContratoService } from '../contrato/contrato.service';


moment.locale('pt-br')

@Injectable()
export class CotacaoService {
	constructor(private readonly mailer: MailerService, private cotacaoDatabaseService: DatabaseCotacaoService, private contratoService: ContratoService, private criptoService: CriptoService) { }

	async getEmpresaByCodigo(codigo: string, codigoEmpresa: string): Promise<Empresa | null> {
		const knex = this.cotacaoDatabaseService.getConnection();
		const result = await knex('pe' + codigoEmpresa).select({
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

	async updateItemCotacao(itemCotacao: any) {

		console.log("Forma pagamento", itemCotacao)

		const codigoFornecedor = await this.criptoService.publicDecript(itemCotacao.fornecedor, "Success2021");
		const empresa = await this.criptoService.publicDecript(itemCotacao.codigoEmpresa, "Success2021");
		//const knex = await this.contratoService.getConexaoClienteCache('1EDFFA7D75A6');
		const knex1 = await this.contratoService.getConexaoCliente(itemCotacao.contratoEmpresa);



		const result = await knex1.schema.raw(
			`UPDATE deic${empresa}, dece${empresa} SET deic${empresa}.custo6 = ${itemCotacao.valorProduto},
			deic${empresa}.mva6 = ${itemCotacao.mva},
			deic${empresa}.datlan6 = '${itemCotacao.data}',
			deic${empresa}.descont6  = ${itemCotacao.desconto},
			deic${empresa}.despesa6  = ${itemCotacao.frete},
			dece${empresa}.observa6 = '${itemCotacao.observacao}',
			deic${empresa}.icmsst6 = ${itemCotacao.st},
			deic${empresa}.icms6 = ${itemCotacao.icms},
			deic${empresa}.ipi6 = ${itemCotacao.ipi},
			deic${empresa}.forpag6 = ${itemCotacao.formaPagamento},
			deic${empresa}.tempoent6 = ${itemCotacao.prazo}
			where deic${empresa}.forneced6 = '${codigoFornecedor}'
			and deic${empresa}.item6 = '${itemCotacao.item}'
			and dece${empresa}.item6 = '${itemCotacao.item}' and deic${empresa}.produto6 = '${itemCotacao.codigoInterno}' and dece${empresa}.produto6 = '${itemCotacao.codigoInterno}';`
		).then((result) => {
			console.log(result)
		}).catch(result => {
			console.log(result)
			throw new NotFoundException("jdjd")
		})



		if (result[0].affectedRows < 1) {
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
	async enviarEmailParaFornecedores(dados: PayloadSuccess): Promise<PayloadEnvioEmail | null> {

		//verifica se a data recebida está no formato válido

		if (dados.validade) {
			let isValid = moment(moment(dados.validade)).isValid();
			if (!isValid) {
				throw new BadRequestException('Data inválida');
			}
		}

		//buscar conexão, se conectar a ela
		const result = await this.contratoService.getDadosConexao(dados.empresa.contratoEmpresaSuccess);
		console.log(result)
		if (dados.validade === null) {

		}
		if (result.servidor === null) {
			const payloadEnvioEmail: PayloadEnvioEmail = {
				empresa: {
					contratoEmpresaSuccess: null,
					numeroCotacao: null,
					numeroEmpresa: null
				},
				fornecedores: [],
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

		} else {
			throw new NotFoundException(`Cotação com o número ${codigoCotacaoDescriptografado} não existe`)
			const payloadEnvioEmail: PayloadEnvioEmail = {
				empresa: {
					contratoEmpresaSuccess: null,
					numeroCotacao: null,
					numeroEmpresa: null
				},
				fornecedores: [],
			}
			return payloadEnvioEmail
		}
		const stringFornecedoresCriptografados: string[] = dados.fornecedores.cnpjFornecedor.split(' ');

		const payloadEnvioEmail: PayloadEnvioEmail = {
			empresa: {
				contratoEmpresaSuccess: dados.empresa.contratoEmpresaSuccess,
				numeroCotacao: dados.empresa.numeroCotacao,
				numeroEmpresa: dados.empresa.numeroEmpresa
			},
			fornecedores: [],
		}
		//console.log(stringFornecedoresCriptografados[0])
		//algo
		// const cnpjs: string = dados.fornecedores.cnpjFornecedor;

		// const fornecedores = cnpjs.split(' ');

		// const emails = [];
		for (const cnpj of stringFornecedoresCriptografados) {
			const raw = await knex.raw(`select hex(cgc2) as cnpj, nome2 as nome, emacot2 as email, codigo2 as codigoFornecedor from da02 where hex(cgc2) = '${cnpj}' limit 1`);
			const snapshot = raw[0][0];
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
		}


		let vencimento = dados.validade;
		const dataVencimentoPadrao = moment().add(30, 'days');
		if (!vencimento) {
			vencimento = dataVencimentoPadrao.format();
		}

		console.log("vencimento", vencimento)

		//payloadEnvioEmail.fornecedores[0] = fornecedor;

		for (let i = 0; i < payloadEnvioEmail.fornecedores.length; i++) {
			if (payloadEnvioEmail.fornecedores[i].email !== null) {

				//gerar o link
				const contratoEmpresa = (dados.empresa.contratoEmpresaSuccess + encode('-success'));
				const numeroEmpresa = (dados.empresa.numeroEmpresa + encode('-success'));
				const numeroCotacao = (dados.empresa.numeroCotacao + encode('-success'));
				const cnpjFornecedor = (payloadEnvioEmail.fornecedores[i].cnpj) + encode('-success');
				const codFornecedor = await this.criptoService.publicEncript((payloadEnvioEmail.fornecedores[i].codigoFornecedor), "Success2021") + encode('-success')
				const dataVencimento = encode(vencimento);

				const fullUrl = contratoEmpresa + numeroEmpresa + numeroCotacao + cnpjFornecedor + codFornecedor + dataVencimento;

				// const prefixUrl = 'http://localhost:3005/painel/cotacao/' + fullUrl;
				const prefixUrl = 'https://cotacaocliente.vercel.app/painel/cotacao/' + fullUrl;
//lucasd
				//await enviar emaild
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
			}
		}



		return payloadEnvioEmail;

	}

	async isAllPreenchido(body: CotacaoTDOPayload) {

	}


}
