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
exports.EmpresaService = void 0;
const common_1 = require("@nestjs/common");
const cripto_1 = require("../common/cripto");
const contrato_dto_1 = require("../contrato/contrato.dto");
const cripto_service_1 = require("../cripto/cripto.service");
const empresa_util_service_1 = require("./empresa.util.service");
let EmpresaService = class EmpresaService {
    constructor(empresaUtil, criptoService) {
        this.empresaUtil = empresaUtil;
        this.criptoService = criptoService;
    }
    async buscarEmpresa(contratoEmpresa, codigoEmpresa, codFornecedor) {
        const knex = await this.empresaUtil.getConexaoCliente(contratoEmpresa);
        const numeroEmpresa = await this.criptoService.publicDecript(codigoEmpresa, "Success2021");
        const empresas = await knex('pe01').select([
            'codigo',
            'razao',
            'empresa',
            'cgc',
            'cidade'
        ]).where('codigo', '=', numeroEmpresa);
        const parsedEmpresas = empresas.map(empresa => ({
            codigo: empresa.codigo,
            razao: (0, cripto_1.restaurar)(empresa.razao).trim(),
            empresa: (0, cripto_1.restaurar)(empresa.empresa).trim(),
            cnpj: empresa.cgc,
            cidade: empresa.cidade
        }));
        return parsedEmpresas[0];
    }
    async buscarFornecedor(contratoEmpresa, codigoEmpresa, codFornecedor) {
        const knex = await this.empresaUtil.getConexaoCliente(contratoEmpresa);
        const numeroFornecedorDescripted = await this.criptoService.publicDecript(codFornecedor, "Success2021");
        const raw = await knex.raw(`select hex(cgc2) as cnpj, email2 as email, nome2 as nome from da02 where codigo2 = '${numeroFornecedorDescripted}' limit 1`);
        const snapshot = raw[0][0];
        const cnpj = await this.criptoService.publicDecript(snapshot === null || snapshot === void 0 ? void 0 : snapshot.cnpj, "Success2021");
        const fornecedor = Object.assign(Object.assign({}, snapshot), { cnpj });
        return fornecedor;
    }
};
EmpresaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [empresa_util_service_1.EmpresautilService, cripto_service_1.CriptoService])
], EmpresaService);
exports.EmpresaService = EmpresaService;
//# sourceMappingURL=empresa.service.js.map