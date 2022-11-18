"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CotacaoModule = void 0;
const cotacao_controller_1 = require("./cotacao.controller");
const cotacao_service_1 = require("./cotacao.service");
const common_1 = require("@nestjs/common");
const contrato_service_1 = require("../contrato/contrato.service");
const database_module_1 = require("../database/database.module");
const cripto_module_1 = require("../cripto/cripto.module");
const contrato_module_1 = require("../contrato/contrato.module");
let CotacaoModule = class CotacaoModule {
};
CotacaoModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, cripto_module_1.CriptoModule, contrato_module_1.ContratoModule],
        controllers: [cotacao_controller_1.CotacaoController,],
        providers: [cotacao_service_1.CotacaoService],
    })
], CotacaoModule);
exports.CotacaoModule = CotacaoModule;
//# sourceMappingURL=cotacao.module.js.map