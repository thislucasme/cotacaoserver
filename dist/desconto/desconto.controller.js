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
exports.DescontoController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const types_1 = require("../models/types");
const desconto_service_1 = require("./desconto.service");
let DescontoController = class DescontoController {
    constructor(descontoService) {
        this.descontoService = descontoService;
    }
    async adcionarDesconto(body, res) {
        const result = await this.descontoService.adicionarDesconto(body);
        if (result.statusCode === common_1.HttpStatus.CREATED) {
            res.status(common_1.HttpStatus.CREATED).send(result);
            return;
        }
        else if (result.statusCode === common_1.HttpStatus.BAD_REQUEST) {
            res.status(common_1.HttpStatus.BAD_REQUEST).send(result);
            return;
        }
    }
    async descontoDev(body, res) {
        const result = await this.descontoService.adicionarDescontoDev(body);
        if (result.statusCode === common_1.HttpStatus.CREATED) {
            res.status(common_1.HttpStatus.CREATED).send(result);
        }
        else if (result.statusCode === common_1.HttpStatus.BAD_REQUEST) {
            res.status(common_1.HttpStatus.BAD_REQUEST).send(result);
        }
    }
    async desconto(body) {
        const result = this.descontoService.teste(body);
        return result;
    }
    async relatorio(body) {
        return this.descontoService.gerar();
    }
};
__decorate([
    (0, common_1.Put)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DescontoController.prototype, "adcionarDesconto", null);
__decorate([
    (0, common_1.Put)('dev'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DescontoController.prototype, "descontoDev", null);
__decorate([
    (0, common_1.Post)('teste'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DescontoController.prototype, "desconto", null);
__decorate([
    (0, common_1.Get)('relatorio'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DescontoController.prototype, "relatorio", null);
DescontoController = __decorate([
    (0, common_1.Controller)('desconto'),
    __metadata("design:paramtypes", [desconto_service_1.DescontoService])
], DescontoController);
exports.DescontoController = DescontoController;
//# sourceMappingURL=desconto.controller.js.map