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
exports.HistoricoTributosService = void 0;
const common_1 = require("@nestjs/common");
const contrato_service_1 = require("../contrato/contrato.service");
const cripto_service_1 = require("../cripto/cripto.service");
const types_1 = require("../models/types");
let HistoricoTributosService = class HistoricoTributosService {
    constructor(contratoService, criptoService) {
        this.contratoService = contratoService;
        this.criptoService = criptoService;
    }
    async buscarHistoricoBy(body) {
        const knex = await this.contratoService.getConexaoCliente(body.contratoEmpresa);
        const fornecedor = await this.criptoService.publicDecript(body.fornecedor, "Success2021");
        const numeroEmpresa = await this.criptoService.publicDecript(body.numeroEmpresa, "Success2021");
        try {
            const result = await knex(`deh3${numeroEmpresa}`).select([
                'produto6 as produto',
                'fornecedo6 as fornecedor',
                'icms6 as icms',
                'icmsst6 as st',
                'ipi6 as ipi',
                'mva6 as mva',
                'data6 as data'
            ]).where('fornecedo6', fornecedor).andWhere('produto6', '=', body.produto6).orderBy('data6', 'desc').limit(1);
            return result;
        }
        catch (e) {
            console.log(e);
            return e;
        }
    }
};
HistoricoTributosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contrato_service_1.ContratoService, cripto_service_1.CriptoService])
], HistoricoTributosService);
exports.HistoricoTributosService = HistoricoTributosService;
//# sourceMappingURL=historico-tributos.service.js.map