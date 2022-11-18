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
exports.FornecedorController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const types_1 = require("../models/types");
const login_tdo_1 = require("../usuario/interfaces/login.tdo");
const fornecedor_service_1 = require("./fornecedor.service");
let FornecedorController = class FornecedorController {
    constructor(fornecedorService, authService) {
        this.fornecedorService = fornecedorService;
        this.authService = authService;
    }
    async findFornecedorByEmail(body, res) {
        const result = await this.fornecedorService.findFornecedorByEmail(body.email);
        if (!result)
            throw new common_1.NotFoundException("Nenhum fornecedor encontrado!");
        return res.status(common_1.HttpStatus.ACCEPTED).send({ 'statusCode': common_1.HttpStatus.ACCEPTED });
    }
    async findFornecedorByEmailNaTabelaCredencial(body) {
        const result = await this.fornecedorService.findFornecedorByEmailCredencials(body.email);
        if (!result)
            throw new common_1.NotFoundException("Nenhum fornecedor encontrado!");
        return result;
    }
    async login(body) {
        const fornecedor = await this.authService.validateUsuario(body.email, body.senha);
        const token = await this.authService.login(fornecedor);
        return token;
    }
    async teste(body) {
        const result = await this.fornecedorService.findFornecedorByEmail(body.email);
        return result;
    }
};
__decorate([
    (0, common_1.Post)('get'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FornecedorController.prototype, "findFornecedorByEmail", null);
__decorate([
    (0, common_1.Post)('verificarCredenciais'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FornecedorController.prototype, "findFornecedorByEmailNaTabelaCredencial", null);
__decorate([
    (0, common_1.Post)('login'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_tdo_1.LoginTdo]),
    __metadata("design:returntype", Promise)
], FornecedorController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('teste'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FornecedorController.prototype, "teste", null);
FornecedorController = __decorate([
    (0, common_1.Controller)("fornecedor"),
    __metadata("design:paramtypes", [fornecedor_service_1.FornecedorService, auth_service_1.AuthService])
], FornecedorController);
exports.FornecedorController = FornecedorController;
//# sourceMappingURL=fornecedor.controller.js.map