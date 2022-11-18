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
exports.DescontoService = void 0;
const common_1 = require("@nestjs/common");
const cripto_1 = require("../common/cripto");
const contrato_dto_1 = require("../contrato/contrato.dto");
const cripto_service_1 = require("../cripto/cripto.service");
const knexCache_1 = require("../database/knexCache");
const site_success_database_service_1 = require("../database/site-success-database.service");
const enuns_1 = require("../enuns/enuns");
const helper_1 = require("../helper/helper");
const types_1 = require("../models/types");
const price_service_1 = require("../price/price.service");
const util_service_1 = require("./util.service");
const percent = require("percent-value");
const fs_1 = require("fs");
const pdfmake_1 = require("pdfmake");
const ABNT_5891_1977 = require('arredondamentoabnt').ABNT_5891_1977;
const abnt = new ABNT_5891_1977(2);
let DescontoService = class DescontoService {
    constructor(siteSuccessDatabase, cripto, priceService, utilService) {
        this.siteSuccessDatabase = siteSuccessDatabase;
        this.cripto = cripto;
        this.priceService = priceService;
        this.utilService = utilService;
        this.gerar = () => {
            const fonts = {
                Helvetica: {
                    normal: 'Helvetica',
                    bold: 'Helvetica-Bold',
                    italics: 'Helvetica-Oblique',
                    bolditalics: 'Helvetica-BoldOblique'
                }
            };
            const printer = new pdfmake_1.default(fonts);
            const docDefinitions = {
                defaultStyle: { font: "Helvetica" },
                content: [
                    { text: "Meu primeiro relatório" }
                ],
            };
            const pdfDoc = printer.createPdfKitDocument(docDefinitions);
            pdfDoc.pipe(fs_1.default.createWriteStream("Relatório.pdf"));
            pdfDoc.end();
            return { ok: 200 };
        };
    }
    async getDados() {
        const knex = await this.siteSuccessDatabase.getConnection();
        const registro = await knex('cfgw').select();
        return registro;
    }
    async getDadosConexaoCache(contrato) {
        const knext = await this.siteSuccessDatabase.getConnection();
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
            .first();
        if (!registro)
            return;
        const registroRestaurado = {
            servidor: (await this.cripto.decriptar(registro.servidor)).trimEnd(),
            banco: (await this.cripto.decriptar(registro.banco)).trimEnd(),
            usuario: (await this.cripto.decriptar(registro.usuario)).trimEnd(),
            senha: (await this.cripto.decriptar(registro.senha)).trimEnd(),
            porta: (await this.cripto.decriptar(registro.porta)).trimEnd(),
            servidorHex: registro.servidor,
            bcohex: registro.banco,
            dataSincronismo: (await this.cripto.decriptar(registro.dataSincronismo)).trimEnd(),
        };
        return registroRestaurado;
    }
    async getConexaoCliente(contrato) {
        const dadosConexao = await this.getDadosConexaoCache(contrato);
        if (!dadosConexao)
            throw new common_1.NotFoundException('Dados de conexão com o banco de dados do cliente não encontrados!');
        const knex = await (0, knexCache_1.getOrCreateKnexInstance)(dadosConexao);
        return knex;
    }
    async getEmpresas(contrato, codigoEmpresa) {
        const knex = await this.getConexaoCliente(contrato);
        const empresas = await knex('pe' + codigoEmpresa).select([
            'codigo',
            'razao',
            'empresa',
            'cgc',
        ]);
        const parsedEmpresas = empresas.map(empresa => ({
            codigo: empresa.codigo,
            razao: (0, cripto_1.restaurar)(empresa.razao),
            empresa: (0, cripto_1.restaurar)(empresa.empresa),
            cnpj: empresa.cgc,
            cidade: empresa.cidade
        }));
        return parsedEmpresas;
    }
    async adicionarDescontoDev(descontoTDO) {
        const knex1 = await this.getConexaoCliente(descontoTDO.dados.contratoEmpresa);
        const empresa = await this.cripto.publicDecript(descontoTDO.dados.codigoEmpresa, "Success2021");
        const fornecedor = await this.cripto.publicDecript(descontoTDO.dados.fornecedor, "Success2021");
        const codigoCotacao = await this.cripto.publicDecript(descontoTDO.dados.codigo, "Success2021");
        const itens = await this.priceService.getItensCotacao(descontoTDO.dados.codigo, descontoTDO.dados.fornecedor, descontoTDO.dados.contratoEmpresa, descontoTDO.dados.codigoEmpresa);
        const itensCotacao = itens[0];
        const itensTyped = (0, helper_1.calcularDiferencaDesconto)(itensCotacao, descontoTDO);
        return await knex1.transaction(trx => {
            const queries = [];
            itensTyped.forEach((item) => {
                const query = knex1('deic' + empresa).update({
                    descot6: item.desconto,
                    despesa6: item.frete,
                    forpag6: descontoTDO.formaPagamento
                }).where('forneced6', fornecedor).andWhere('codigo6', codigoCotacao).andWhere("item6", item.item)
                    .transacting(trx).debug(false);
                queries.push(query);
            });
            Promise.all(queries)
                .then(trx.commit)
                .catch(trx.rollback);
        }).then((resposta) => {
            let total = 0;
            resposta.forEach((code) => {
                total += code;
            });
            if (total !== itensCotacao.length) {
                return {
                    "statusCode": common_1.HttpStatus.BAD_REQUEST,
                    "message": "Ocorreu um erro ao atualizar os itens",
                };
            }
            return {
                "statusCode": 201,
                "message": "Itens atualizados",
            };
        }).catch(error => {
            console.log("error", error);
            return {
                "statusCode": common_1.HttpStatus.BAD_REQUEST,
                "message": "Ocorreu um erro ao atualizar os itens",
            };
        });
    }
    async teste(body) {
        const desconto = body.percentual;
        const dados = [
            {
                valor: 3,
                desconto: 0
            },
            {
                valor: 3,
                desconto: 0
            },
            {
                valor: 3,
                desconto: 0
            },
            {
                valor: 3,
                desconto: 0
            }
        ];
        const valorTotalItens = await this.utilService.calcularTotalItens(dados);
        const percentual = abnt.arredonda(percent(desconto).of(valorTotalItens));
        let value = Number.parseFloat(abnt.arredonda(percent(percentual).from(valorTotalItens)).toFixed(2));
        value += value - desconto;
    }
    async adicionarDesconto(descontoTDO) {
        const knex1 = await this.getConexaoCliente(descontoTDO.dados.contratoEmpresa);
        const empresa = await this.cripto.publicDecript(descontoTDO.dados.codigoEmpresa, "Success2021");
        const fornecedor = await this.cripto.publicDecript(descontoTDO.dados.fornecedor, "Success2021");
        const codigoCotacao = await this.cripto.publicDecript(descontoTDO.dados.codigo, "Success2021");
        const totalItens = await knex1.schema.raw(`select count(item6) as total from deic${empresa} where codigo6 = '${codigoCotacao}'  and forneced6 = '${fornecedor}';`);
        const ids = await knex1.schema.raw(`select item6 from deic${empresa} where codigo6 = '${codigoCotacao}'  and forneced6 = '${fornecedor}';`);
        const arrayGenerated = await this.utilService.generateArrayOfValues(descontoTDO, totalItens);
        const arrayGeneratedDesconto = await this.utilService.generateArrayOfValuesDesconto(descontoTDO, totalItens);
        const arrayIdGenerated = await this.utilService.generateIdDataByArray(ids);
        const frete = await knex1.schema.raw(`update deic${empresa} as itens set descot6 = ${arrayGeneratedDesconto.first},
			despesa6 = ${arrayGenerated.first},
			forpag6  = ${descontoTDO.formaPagamento}
				where codigo6 = '${codigoCotacao}'  and forneced6 = '${fornecedor}' and item6 != ${arrayIdGenerated.last}; `);
        const desconto = await knex1.schema.raw(`update deic${empresa} as itens set descot6 = ${arrayGeneratedDesconto.last},
			despesa6 = ${arrayGenerated.last},
			forpag6  = ${descontoTDO.formaPagamento}
				where codigo6 = '${codigoCotacao}'  and forneced6 = '${fornecedor}' and item6 = ${arrayIdGenerated.last}; `);
        console.log("=========");
        console.log(descontoTDO);
        console.log("=========");
        return { statusCode: common_1.HttpStatus.CREATED, message: `201 Created`, success: true };
    }
    ajustarDesconto() {
    }
};
DescontoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [site_success_database_service_1.SiteSuccessDatabaseService,
        cripto_service_1.CriptoService,
        price_service_1.PriceService,
        util_service_1.UtilService])
], DescontoService);
exports.DescontoService = DescontoService;
//# sourceMappingURL=desconto.service.js.map