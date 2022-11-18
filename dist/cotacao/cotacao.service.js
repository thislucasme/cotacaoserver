"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CotacaoService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const base_64_1 = require("base-64");
const knex_1 = require("knex");
const moment = require("moment");
const cripto_1 = require("../common/cripto");
const contrato_dto_1 = require("../contrato/contrato.dto");
const cripto_service_1 = require("../cripto/cripto.service");
const database_cotacao_service_1 = require("../database/database-cotacao.service");
const types_1 = require("../models/types");
const util_1 = require("../util/util");
const contrato_service_1 = require("../contrato/contrato.service");
moment.locale('pt-br');
let CotacaoService = class CotacaoService {
    constructor(mailer, cotacaoDatabaseService, contratoService, criptoService) {
        this.mailer = mailer;
        this.cotacaoDatabaseService = cotacaoDatabaseService;
        this.contratoService = contratoService;
        this.criptoService = criptoService;
    }
    async getEmpresaByCodigo(codigo, codigoEmpresa) {
        const knex = this.cotacaoDatabaseService.getConnection();
        const result = await knex('pe' + codigoEmpresa).select({
            codigo: 'codigo',
            razao: 'razao',
            empresa: 'empresa',
            cidade: 'cidade',
            cnpj: 'cgc'
        }).where('codigo', codigo).first();
        const empresa = {
            codigo: result.codigo,
            razao: (0, cripto_1.restaurar)(result.razao),
            empresa: (0, cripto_1.restaurar)(result.empresa),
            cnpj: result.cnpj,
            cidade: result.cidade
        };
        return empresa;
    }
    async updateItemCotacao(itemCotacao) {
        console.log("Forma pagamento", itemCotacao);
        const codigoFornecedor = await this.criptoService.publicDecript(itemCotacao.fornecedor, "Success2021");
        const empresa = await this.criptoService.publicDecript(itemCotacao.codigoEmpresa, "Success2021");
        const knex1 = await this.contratoService.getConexaoCliente(itemCotacao.contratoEmpresa);
        const result = await knex1.schema.raw(`UPDATE deic${empresa}, dece${empresa} SET deic${empresa}.custo6 = ${itemCotacao.valorProduto},
			deic${empresa}.mva6 = ${itemCotacao.mva},
			deic${empresa}.datlan6 = '${itemCotacao.data}',
			deic${empresa}.descot6 = ${itemCotacao.desconto},
			deic${empresa}.despesa6  = ${itemCotacao.frete},
			deic${empresa}.observac6 = '${itemCotacao.observacao}',
			deic${empresa}.icmsst6 = ${itemCotacao.st},
			deic${empresa}.icms6 = ${itemCotacao.icms},
			deic${empresa}.ipi6 = ${itemCotacao.ipi},
			deic${empresa}.forpag6 = ${itemCotacao.formaPagamento},
			deic${empresa}.tempoent6 = ${itemCotacao.prazo}
			where deic${empresa}.forneced6 = '${codigoFornecedor}'
			and deic${empresa}.item6 = '${itemCotacao.item}'
			and dece${empresa}.item6 = '${itemCotacao.item}' and deic${empresa}.produto6 = '${itemCotacao.codigoInterno}' and dece${empresa}.produto6 = '${itemCotacao.codigoInterno}';`).then((result) => {
            console.log(result);
        }).catch(result => {
            console.log(result);
            throw new common_1.NotFoundException("jdjd");
        });
        if (result[0].affectedRows < 1) {
            return { status: common_1.HttpStatus.NO_CONTENT, msg: "Erro ao atualizar o item" };
        }
        return { status: common_1.HttpStatus.CREATED, msg: "item atualizado com sucesso!" };
    }
    async enviarEmail() {
        const emailTask = await this.mailer.sendMail({
            to: "lucassilvaee1245@gmail.com",
            from: 'automatico@success.inf.br',
            subject: 'Código de acesso do Portal Cotações Success',
            html: (0, util_1.createhtml)('', null, ''),
            text: `
      Para acessar o Portal Cotações, digite o código abaixo no campo onde foi solicitado:
      teste2
      Por questões de segurança esse código expira após 10 minutos.`,
        });
        return emailTask;
    }
    async sendEmailTo(email, url, empresa, fornecedor) {
        const emailTask = await this.mailer.sendMail({
            to: email,
            from: 'automatico@success.inf.br',
            subject: 'Código de acesso do Portal Cotações Success',
            html: (0, util_1.createhtml)(url, empresa, fornecedor),
            text: `
      Para acessar o Portal Cotações, digite o código abaixo no campo onde foi solicitado:
      teste2
      Por questões de segurança esse código expira após 10 minutos.`,
        });
        return emailTask;
    }
    verificarTodosCampos(cotacaoPayLoad) {
        let status = true;
        cotacaoPayLoad === null || cotacaoPayLoad === void 0 ? void 0 : cotacaoPayLoad.forEach((element) => {
            const result = this.verificarCampo(element);
            if (!result) {
                status = result;
            }
        });
        return { status: status };
    }
    verificarCampo(dadosSuccess) {
        if (!dadosSuccess.cnpjFornecedor || !dadosSuccess.contratoEmpresaSucess || !dadosSuccess.numeroCotacao || !dadosSuccess.numeroEmpresa) {
            return false;
        }
        return true;
    }
    async enviarEmailParaFornecedores(dados) {
        if (dados.validade) {
            let isValid = moment(moment(dados.validade)).isValid();
            if (!isValid) {
                throw new common_1.BadRequestException('Data inválida');
            }
        }
        const result = await this.contratoService.getDadosConexao(dados.empresa.contratoEmpresaSuccess);
        console.log(result);
        if (dados.validade === null) {
        }
        if (result.servidor === null) {
            const payloadEnvioEmail = {
                empresa: {
                    contratoEmpresaSuccess: null,
                    numeroCotacao: null,
                    numeroEmpresa: null
                },
                fornecedores: [],
            };
            return payloadEnvioEmail;
        }
        const knex = (0, knex_1.default)({
            client: 'mysql2',
            connection: {
                host: result.servidor,
                port: Number(result.porta),
                user: result.usuario,
                password: result.senha,
                database: result.banco
            }
        });
        const codigoCotacaoDescriptografado = await this.criptoService.publicDecript(dados.empresa.numeroCotacao, "Success2021");
        const codigoEmpresaDescriptografado = await this.criptoService.publicDecript(dados.empresa.numeroEmpresa, "Success2021");
        const cotacao = await knex.raw(`select codigo6 as codigo from dece${codigoEmpresaDescriptografado} where codigo6 =  '${codigoCotacaoDescriptografado}' and sr_deleted != 'T' limit 1;`);
        const snapshot = cotacao[0][0];
        if (snapshot) {
        }
        else {
            throw new common_1.NotFoundException(`Cotação com o número ${codigoCotacaoDescriptografado} não existe`);
            const payloadEnvioEmail = {
                empresa: {
                    contratoEmpresaSuccess: null,
                    numeroCotacao: null,
                    numeroEmpresa: null
                },
                fornecedores: [],
            };
            return payloadEnvioEmail;
        }
        const stringFornecedoresCriptografados = dados.fornecedores.cnpjFornecedor.split(' ');
        const payloadEnvioEmail = {
            empresa: {
                contratoEmpresaSuccess: dados.empresa.contratoEmpresaSuccess,
                numeroCotacao: dados.empresa.numeroCotacao,
                numeroEmpresa: dados.empresa.numeroEmpresa
            },
            fornecedores: [],
        };
        for (const cnpj of stringFornecedoresCriptografados) {
            const raw = await knex.raw(`select hex(cgc2) as cnpj, nome2 as nome, email2 as email, codigo2 as codigoFornecedor from da02 where hex(cgc2) = '${cnpj}' limit 1`);
            const snapshot = raw[0][0];
            const fornecedor = {
                cnpj: cnpj,
                email: (snapshot === null || snapshot === void 0 ? void 0 : snapshot.email) ? snapshot === null || snapshot === void 0 ? void 0 : snapshot.email : null,
                enviado: false,
                url: null,
                codigoFornecedor: (snapshot === null || snapshot === void 0 ? void 0 : snapshot.codigoFornecedor) ? snapshot === null || snapshot === void 0 ? void 0 : snapshot.codigoFornecedor : "",
                nome: snapshot === null || snapshot === void 0 ? void 0 : snapshot.nome
            };
            payloadEnvioEmail.fornecedores.push(fornecedor);
        }
        const numeroEmpresa = await this.criptoService.publicDecript(dados.empresa.numeroEmpresa, "Success2021");
        let empresa;
        try {
            const empresaDB = await knex('pe01').select({
                codigo: 'codigo',
                razao: 'razao',
                empresa: 'empresa',
                cidade: 'cidade',
                cnpj: 'cgc'
            }).where('codigo', numeroEmpresa).first();
            empresa = {
                codigo: empresaDB.codigo,
                razao: (0, cripto_1.restaurar)(empresaDB.razao),
                empresa: (0, cripto_1.restaurar)(empresaDB.empresa),
                cnpj: empresaDB.cnpj,
                cidade: empresaDB.cidade
            };
        }
        catch (e) {
        }
        let vencimento = dados.validade;
        const dataVencimentoPadrao = moment().add(30, 'days');
        if (!vencimento) {
            vencimento = dataVencimentoPadrao.format();
        }
        console.log("vencimento", vencimento);
        for (let i = 0; i < payloadEnvioEmail.fornecedores.length; i++) {
            if (payloadEnvioEmail.fornecedores[i].email !== null) {
                const contratoEmpresa = (dados.empresa.contratoEmpresaSuccess + (0, base_64_1.encode)('-success'));
                const numeroEmpresa = (dados.empresa.numeroEmpresa + (0, base_64_1.encode)('-success'));
                const numeroCotacao = (dados.empresa.numeroCotacao + (0, base_64_1.encode)('-success'));
                const cnpjFornecedor = (payloadEnvioEmail.fornecedores[i].cnpj) + (0, base_64_1.encode)('-success');
                const codFornecedor = await this.criptoService.publicEncript((payloadEnvioEmail.fornecedores[i].codigoFornecedor), "Success2021") + (0, base_64_1.encode)('-success');
                const dataVencimento = (0, base_64_1.encode)(vencimento);
                const fullUrl = contratoEmpresa + numeroEmpresa + numeroCotacao + cnpjFornecedor + codFornecedor + dataVencimento;
                const prefixUrl = 'http://localhost:3005/painel/cotacao/' + fullUrl;
                const envio = await this.sendEmailTo(payloadEnvioEmail.fornecedores[i].email, prefixUrl, empresa, payloadEnvioEmail.fornecedores[i].nome);
                const accepted = envio.accepted[0] === payloadEnvioEmail.fornecedores[i].email;
                const fornecedor = {
                    cnpj: payloadEnvioEmail.fornecedores[i].cnpj,
                    email: payloadEnvioEmail.fornecedores[i].email,
                    enviado: accepted,
                    url: prefixUrl,
                    codigoFornecedor: payloadEnvioEmail.fornecedores[i].codigoFornecedor,
                    nome: ''
                };
                payloadEnvioEmail.fornecedores[i] = fornecedor;
            }
        }
        return payloadEnvioEmail;
    }
    async isAllPreenchido(body) {
    }
};
CotacaoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService, database_cotacao_service_1.DatabaseCotacaoService, contrato_service_1.ContratoService, cripto_service_1.CriptoService])
], CotacaoService);
exports.CotacaoService = CotacaoService;
//# sourceMappingURL=cotacao.service.js.map