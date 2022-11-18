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
exports.PriceService = void 0;
const common_1 = require("@nestjs/common");
const cripto_1 = require("../common/cripto");
const contrato_dto_1 = require("../contrato/contrato.dto");
const cripto_service_1 = require("../cripto/cripto.service");
const knexCache_1 = require("../database/knexCache");
const site_success_database_service_1 = require("../database/site-success-database.service");
const types_1 = require("../models/types");
const ABNT_5891_1977 = require('arredondamentoabnt').ABNT_5891_1977;
const abnt = new ABNT_5891_1977(2);
let PriceService = class PriceService {
    constructor(siteSuccessDatabase, cripto) {
        this.siteSuccessDatabase = siteSuccessDatabase;
        this.cripto = cripto;
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
    async getItensCotacao(codCotacao, codFornecedor, contrato, codigoEmpresa) {
        const codigoCotacao = await this.cripto.publicDecript(codCotacao, "Success2021");
        const codigoFornecedor = await this.cripto.publicDecript(codFornecedor, "Success2021");
        const empresa = await this.cripto.publicDecript(codigoEmpresa, "Success2021");
        const knex = await this.getConexaoCliente(contrato);
        const result = await knex('deic' + empresa)
            .leftJoin('dece' + empresa, (k) => k.on(`dece${empresa}.codigo6`, `deic${empresa}.codigo6`).andOn(`dece${empresa}.item6`, `deic${empresa}.item6`))
            .where(`deic${empresa}.forneced6`, codigoFornecedor)
            .andWhere(`deic${empresa}.codigo6`, codigoCotacao)
            .select({
            quantidade: `dece${empresa}.qtd6`,
            marca: `dece${empresa}.marca6`,
            descricao: `dece${empresa}.descricao6`,
            data: `deic${empresa}.data6`,
            codigo: `deic${empresa}.codigo6`,
            item: `deic${empresa}.item6`,
            produto: `deic${empresa}.produto6`,
            valordoproduto: `deic${empresa}.custo6`,
            frete: `deic${empresa}.despesa6`,
            st: `deic${empresa}.icmsst6`,
            icms: `deic${empresa}.icms6`,
            ipi: `deic${empresa}.ipi6`,
            mva: `deic${empresa}.mva6`,
            codbarras: `deic${empresa}.codfabric6`,
            formapagamento: `deic${empresa}.forpag6 `,
            desconto: `deic${empresa}.descot6`,
            observacao: `deic${empresa}.observac6`,
            prazo: `deic${empresa}.tempoent6`,
            formaPagamento: `deic${empresa}.forpag6`
        }).debug(false);
        const array = result;
        return [array];
    }
    async calcularFrete(cotacaoPayLoad) {
        const codigoCotacao = await this.cripto.publicDecript(cotacaoPayLoad.codigo, "Success2021");
        const codigoFornecedor = await this.cripto.publicDecript(cotacaoPayLoad.fornecedor, "Success2021");
        const empresa = await this.cripto.publicDecript(cotacaoPayLoad.codigoEmpresa, "Success2021");
        const knex = await this.getConexaoCliente(cotacaoPayLoad.contratoEmpresa);
        const result = await knex.raw(`select ifnull(sum(despesa6), 0) as totalFrete  from dece${empresa} as dece,
			deic${empresa} as deic where dece.codigo6 = deic.codigo6 and dece.item6 = deic.item6 and
			dece.codigo6 = '${codigoCotacao}' and deic.forneced6 = '${codigoFornecedor}'; `);
        return result[0];
    }
    async calcularTotal(cotacaoPayLoad, buscarIds) {
        const codigoCotacao = await this.cripto.publicDecript(cotacaoPayLoad.codigo, "Success2021");
        const codigoFornecedor = await this.cripto.publicDecript(cotacaoPayLoad.fornecedor, "Success2021");
        const empresa = await this.cripto.publicDecript(cotacaoPayLoad.codigoEmpresa, "Success2021");
        const knex = await this.getConexaoCliente(cotacaoPayLoad.contratoEmpresa);
        const result = await knex.raw(`select ifnull(sum(deic.custo6 * dece.qtd6 + ifnull(deic.despesa6, 0)), 0) as total  from dece${empresa} as dece,
			deic${empresa} as deic where dece.codigo6 = deic.codigo6 and dece.item6 = deic.item6 and
			dece.codigo6 = '${codigoCotacao}' and deic.forneced6 = '${codigoFornecedor}'; `);
        if (buscarIds) {
            const ids = await knex.raw(`select deic.item6  from dece${empresa} as dece,
			deic${empresa} as deic where dece.codigo6 = deic.codigo6 and dece.item6 = deic.item6 and
			dece.codigo6 = '${codigoCotacao}' and deic.forneced6 = '${codigoFornecedor}'; `);
            return [result[0][0], ids[0][0]];
        }
        else {
            return [result[0][0]];
        }
    }
    async calcularTotalDesconto(cotacaoPayLoad) {
        const codigoCotacao = await this.cripto.publicDecript(cotacaoPayLoad.codigo, "Success2021");
        const codigoFornecedor = await this.cripto.publicDecript(cotacaoPayLoad.fornecedor, "Success2021");
        const empresa = await this.cripto.publicDecript(cotacaoPayLoad.codigoEmpresa, "Success2021");
        const knex = await this.getConexaoCliente(cotacaoPayLoad.contratoEmpresa);
        const result = await knex.raw(`select ifnull(sum(deic.descot6), 0) as totalDesconto  from dece${empresa} as dece,
			deic${empresa} as deic where dece.codigo6 = deic.codigo6 and dece.item6 = deic.item6 and
			dece.codigo6 = '${codigoCotacao}' and deic.forneced6 = '${codigoFornecedor}'; `);
        return result[0];
    }
};
PriceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [site_success_database_service_1.SiteSuccessDatabaseService,
        cripto_service_1.CriptoService])
], PriceService);
exports.PriceService = PriceService;
//# sourceMappingURL=price.service.js.map