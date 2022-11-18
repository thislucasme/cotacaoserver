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
exports.FlagService = void 0;
const common_1 = require("@nestjs/common");
const contrato_service_1 = require("../contrato/contrato.service");
const cripto_service_1 = require("../cripto/cripto.service");
const types_1 = require("../models/types");
const flagutil_service_1 = require("./flagutil.service");
let FlagService = class FlagService {
    constructor(contratoService, flagServiceUtil, criptoService) {
        this.contratoService = contratoService;
        this.flagServiceUtil = flagServiceUtil;
        this.criptoService = criptoService;
    }
    async consultarFlags(cotacaoPayload) {
        const dadosEmpresa = await this.flagServiceUtil.getConexaoCliente(cotacaoPayload.contratoEmpresa);
        const codigo = await this.criptoService.publicDecript(cotacaoPayload.codigo, "Success2021");
        const fornecedor = await this.criptoService.publicDecript(cotacaoPayload.fornecedor, "Success2021");
        const empresa = await this.criptoService.publicDecript(cotacaoPayload.codigoEmpresa, "Success2021");
        const result = await dadosEmpresa.raw(`select dece.codigo6, dece.item6, deic.stasinc6  as fornvenc6  from dece${empresa} as dece,
			deic${empresa} as deic where dece.codigo6 = deic.codigo6 and dece.item6 = deic.item6
			and dece.codigo6 = '${codigo}' and deic.forneced6 = '${fornecedor}'; `);
        return result[0];
    }
    async finalizarCotacao(cotacaoTDOPayload) {
        const knex = await this.flagServiceUtil.getConexaoCliente(cotacaoTDOPayload.contratoEmpresa);
        const codigoFornecedorDescript = await this.criptoService.publicDecript(cotacaoTDOPayload.fornecedor, "Success2021");
        const codigoCotacaoDescript = await this.criptoService.publicDecript(cotacaoTDOPayload.codigo, "Success2021");
        const codigoEmpresa = await this.criptoService.publicDecript(cotacaoTDOPayload.codigoEmpresa, "Success2021");
        try {
            const result = await knex.raw(`update dece${codigoEmpresa} as dece, deic${codigoEmpresa} as deic set deic.stasinc6 = '${cotacaoTDOPayload.flag}' 
			where dece.codigo6 = deic.codigo6 and dece.item6 = deic.item6 and
			dece.codigo6 = '${codigoCotacaoDescript}' and deic.forneced6 = '${codigoFornecedorDescript}'; `);
            if (result[0].affectedRows == 0) {
                return { data: null, code: 404 };
            }
            console.log("Sucesso ao salvar");
            return result;
        }
        catch (e) {
            console.log("Ocorreu um erro");
            return { data: null, code: 400, error: e };
        }
    }
};
FlagService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contrato_service_1.ContratoService, flagutil_service_1.FlagutilService, cripto_service_1.CriptoService])
], FlagService);
exports.FlagService = FlagService;
//# sourceMappingURL=flag.service.js.map