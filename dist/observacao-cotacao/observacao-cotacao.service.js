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
exports.ObservacaoCotacaoService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const contrato_service_1 = require("../contrato/contrato.service");
const cripto_service_1 = require("../cripto/cripto.service");
const empresa_util_service_1 = require("../empresa/empresa.util.service");
const types_1 = require("../models/types");
const util_1 = require("../util/util");
let ObservacaoCotacaoService = class ObservacaoCotacaoService {
    constructor(configService, contratoService, criptoService, empresaUtil) {
        this.contratoService = contratoService;
        this.criptoService = criptoService;
        this.empresaUtil = empresaUtil;
        const chave = configService.get('chaveCripto');
        if (!chave)
            throw new Error('VARIAVEL DE AMBIENTE SITE_SUCCESS_DB_HOST NÃO CONFIGURADA!');
        this.chave = chave;
    }
    async salvarObservacao(observacao) {
        const knex = await this.empresaUtil.getConexaoCliente(observacao === null || observacao === void 0 ? void 0 : observacao.contratoEmpresa);
        const empresaDescriptografada = await this.criptoService.decriptar(observacao.codigoEmpresa);
        const cotacaoDescriptografada = await this.criptoService.decriptar(observacao.cotacao);
        const query = knex((0, util_1.createTableName)('dece', empresaDescriptografada !== null && empresaDescriptografada !== void 0 ? empresaDescriptografada : ''))
            .update({ observa6: observacao === null || observacao === void 0 ? void 0 : observacao.observacao })
            .where("codigo6", "=", cotacaoDescriptografada);
        const result = await query;
        if (result === 0) {
            throw new common_1.BadRequestException("Ocorreu um erro ao salvar a observação.");
        }
    }
    async retornaObservacao(observacao) {
        const knex = await this.empresaUtil.getConexaoCliente(observacao === null || observacao === void 0 ? void 0 : observacao.contratoEmpresa);
        const empresaDescriptografada = await this.criptoService.decriptar(observacao.codigoEmpresa);
        const cotacaoDescriptografada = await this.criptoService.decriptar(observacao.cotacao);
        const query = knex()
            .select({ observacao: 'observa6' })
            .from((0, util_1.createTableName)('dece', empresaDescriptografada !== null && empresaDescriptografada !== void 0 ? empresaDescriptografada : ''))
            .where("codigo6", "=", cotacaoDescriptografada).limit(1);
        console.log(query.toQuery());
        const result = await query;
        if (result.length === 0) {
            throw new common_1.HttpException('NoCotent', common_1.HttpStatus.NO_CONTENT);
        }
        return result[0];
    }
};
ObservacaoCotacaoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, contrato_service_1.ContratoService, cripto_service_1.CriptoService, empresa_util_service_1.EmpresautilService])
], ObservacaoCotacaoService);
exports.ObservacaoCotacaoService = ObservacaoCotacaoService;
//# sourceMappingURL=observacao-cotacao.service.js.map