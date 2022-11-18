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
exports.CriptoController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cripto_1 = require("../common/cripto");
const cripto_dto_1 = require("./cripto.dto");
const cripto_service_1 = require("./cripto.service");
let CriptoController = class CriptoController {
    constructor(cripto) {
        this.cripto = cripto;
    }
    async decriptarUm(body) {
        const { cifra, chave } = body;
        const decoded = await this.cripto.publicDecript(cifra, chave);
        return decoded;
    }
    async encriptarUm(body) {
        const { cifra, chave } = body;
        const encoded = await this.cripto.publicEncript(cifra, chave);
        return encoded;
    }
};
__decorate([
    (0, common_1.Post)('decrypt'),
    openapi.ApiResponse({ status: 201, type: String }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cripto_dto_1.criptoUmDto]),
    __metadata("design:returntype", Promise)
], CriptoController.prototype, "decriptarUm", null);
__decorate([
    (0, common_1.Post)('encrypt'),
    openapi.ApiResponse({ status: 201, type: String }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cripto_dto_1.criptoUmDto]),
    __metadata("design:returntype", Promise)
], CriptoController.prototype, "encriptarUm", null);
CriptoController = __decorate([
    (0, swagger_1.ApiTags)('cripto'),
    (0, common_1.Controller)('cripto'),
    __metadata("design:paramtypes", [cripto_service_1.CriptoService])
], CriptoController);
exports.CriptoController = CriptoController;
//# sourceMappingURL=cripto.controller.js.map