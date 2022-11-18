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
exports.ClienteController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const cliente_service_1 = require("./cliente.service");
const cotacao_service_1 = require("../cotacao/cotacao.service");
let ClienteController = class ClienteController {
    constructor(clienteService, cotacaoService) {
        this.clienteService = clienteService;
        this.cotacaoService = cotacaoService;
    }
    async teste() {
        ;
    }
};
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "teste", null);
ClienteController = __decorate([
    (0, common_1.Controller)('banco'),
    __metadata("design:paramtypes", [cliente_service_1.ClienteService, cotacao_service_1.CotacaoService])
], ClienteController);
exports.ClienteController = ClienteController;
//# sourceMappingURL=cliente.controller.js.map