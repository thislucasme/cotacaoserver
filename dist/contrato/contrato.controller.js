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
exports.ContratoController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const contrato_service_1 = require("./contrato.service");
let ContratoController = class ContratoController {
    constructor(contratoService) {
        this.contratoService = contratoService;
    }
    async teste() {
        return await this.contratoService.getDadosConexao('000173');
    }
};
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContratoController.prototype, "teste", null);
ContratoController = __decorate([
    (0, common_1.Controller)('contrato'),
    __metadata("design:paramtypes", [contrato_service_1.ContratoService])
], ContratoController);
exports.ContratoController = ContratoController;
//# sourceMappingURL=contrato.controller.js.map