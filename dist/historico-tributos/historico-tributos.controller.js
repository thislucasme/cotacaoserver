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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoricoTributosController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const types_1 = require("../models/types");
const historico_tributos_service_1 = require("./historico-tributos.service");
let HistoricoTributosController = class HistoricoTributosController {
    constructor(historicoTributos) {
        this.historicoTributos = historicoTributos;
    }
    async buscarHistoricoDeProdutoBy(body, res) {
        const result = await this.historicoTributos.buscarHistoricoBy(body);
        if ((result === null || result === void 0 ? void 0 : result.errno) === 1146) {
            res.status(common_1.HttpStatus.NO_CONTENT).send();
            console.log(result === null || result === void 0 ? void 0 : result.errno);
            return;
        }
        result.length == 0 ? res.status(common_1.HttpStatus.NO_CONTENT).send() : res.status(common_1.HttpStatus.OK).send(result);
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HistoricoTributosController.prototype, "buscarHistoricoDeProdutoBy", null);
HistoricoTributosController = __decorate([
    (0, common_1.Controller)('historico-tributos'),
    __metadata("design:paramtypes", [historico_tributos_service_1.HistoricoTributosService])
], HistoricoTributosController);
exports.HistoricoTributosController = HistoricoTributosController;
//# sourceMappingURL=historico-tributos.controller.js.map