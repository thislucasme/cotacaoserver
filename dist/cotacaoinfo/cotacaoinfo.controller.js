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
exports.CotacaoinfoController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const cotacaoinfo_service_1 = require("./cotacaoinfo.service");
let CotacaoinfoController = class CotacaoinfoController {
    constructor(cotacaoInfoService) {
        this.cotacaoInfoService = cotacaoInfoService;
    }
    async get(body) {
        const result = await this.cotacaoInfoService.salvarObservacaoTempoEntrega(body);
        return result;
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CotacaoinfoController.prototype, "get", null);
CotacaoinfoController = __decorate([
    (0, common_1.Controller)('cotacaoinfo'),
    __metadata("design:paramtypes", [cotacaoinfo_service_1.CotacaoinfoService])
], CotacaoinfoController);
exports.CotacaoinfoController = CotacaoinfoController;
//# sourceMappingURL=cotacaoinfo.controller.js.map