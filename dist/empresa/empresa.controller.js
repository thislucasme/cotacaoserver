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
exports.EmpresaController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const empresa_service_1 = require("./empresa.service");
const empresa_util_service_1 = require("./empresa.util.service");
let EmpresaController = class EmpresaController {
    constructor(empresaService, empresaUtilService) {
        this.empresaService = empresaService;
        this.empresaUtilService = empresaUtilService;
    }
    async getEmpresa(contrato, fornecedor, codigoEmpresa) {
        const result = await this.empresaService.buscarEmpresa(contrato, codigoEmpresa, fornecedor);
        return result;
    }
    async getFornecedor(contrato, fornecedor, codigoEmpresa) {
        const result = await this.empresaService.buscarFornecedor(contrato, codigoEmpresa, fornecedor);
        return result;
    }
};
__decorate([
    (0, common_1.Get)('/:contrato/:fornecedor/:codigo'),
    openapi.ApiResponse({ status: 200, type: require("../contrato/contrato.dto").Empresa }),
    __param(0, (0, common_1.Param)('contrato')),
    __param(1, (0, common_1.Param)('fornecedor')),
    __param(2, (0, common_1.Param)('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], EmpresaController.prototype, "getEmpresa", null);
__decorate([
    (0, common_1.Get)('fornecedor/:contrato/:fornecedor/:codigo'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('contrato')),
    __param(1, (0, common_1.Param)('fornecedor')),
    __param(2, (0, common_1.Param)('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], EmpresaController.prototype, "getFornecedor", null);
EmpresaController = __decorate([
    (0, common_1.Controller)('empresa'),
    __metadata("design:paramtypes", [empresa_service_1.EmpresaService, empresa_util_service_1.EmpresautilService])
], EmpresaController);
exports.EmpresaController = EmpresaController;
//# sourceMappingURL=empresa.controller.js.map