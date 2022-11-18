"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObservacaoCotacaoModule = void 0;
const common_1 = require("@nestjs/common");
const contrato_module_1 = require("../contrato/contrato.module");
const contrato_service_1 = require("../contrato/contrato.service");
const cripto_module_1 = require("../cripto/cripto.module");
const database_module_1 = require("../database/database.module");
const empresa_module_1 = require("../empresa/empresa.module");
const observacao_cotacao_controller_1 = require("./observacao-cotacao.controller");
const observacao_cotacao_service_1 = require("./observacao-cotacao.service");
let ObservacaoCotacaoModule = class ObservacaoCotacaoModule {
};
ObservacaoCotacaoModule = __decorate([
    (0, common_1.Module)({
        imports: [contrato_module_1.ContratoModule,
            empresa_module_1.EmpresaModule,
            cripto_module_1.CriptoModule,
            database_module_1.DatabaseModule],
        controllers: [
            observacao_cotacao_controller_1.ObservacaoCotacaoController,
        ],
        providers: [
            observacao_cotacao_service_1.ObservacaoCotacaoService,
            contrato_service_1.ContratoService
        ],
    })
], ObservacaoCotacaoModule);
exports.ObservacaoCotacaoModule = ObservacaoCotacaoModule;
//# sourceMappingURL=observacao-cotacao.module.js.map