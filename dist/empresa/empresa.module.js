"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpresaModule = void 0;
const empresa_controller_1 = require("./empresa.controller");
const empresa_service_1 = require("./empresa.service");
const common_1 = require("@nestjs/common");
const contrato_module_1 = require("../contrato/contrato.module");
const site_success_database_service_1 = require("../database/site-success-database.service");
const cripto_service_1 = require("../cripto/cripto.service");
const empresa_util_service_1 = require("./empresa.util.service");
const database_module_1 = require("../database/database.module");
const cripto_module_1 = require("../cripto/cripto.module");
let EmpresaModule = class EmpresaModule {
};
EmpresaModule = __decorate([
    (0, common_1.Module)({
        imports: [contrato_module_1.ContratoModule, database_module_1.DatabaseModule, cripto_module_1.CriptoModule],
        controllers: [empresa_controller_1.EmpresaController],
        providers: [empresa_service_1.EmpresaService, empresa_util_service_1.EmpresautilService],
        exports: [empresa_util_service_1.EmpresautilService, empresa_service_1.EmpresaService]
    })
], EmpresaModule);
exports.EmpresaModule = EmpresaModule;
//# sourceMappingURL=empresa.module.js.map