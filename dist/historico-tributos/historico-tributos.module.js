"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoricoTributosModule = void 0;
const historico_tributos_controller_1 = require("./historico-tributos.controller");
const historico_tributos_service_1 = require("./historico-tributos.service");
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database/database.module");
const contrato_module_1 = require("../contrato/contrato.module");
const cripto_module_1 = require("../cripto/cripto.module");
let HistoricoTributosModule = class HistoricoTributosModule {
};
HistoricoTributosModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, contrato_module_1.ContratoModule, cripto_module_1.CriptoModule],
        controllers: [
            historico_tributos_controller_1.HistoricoTributosController,
        ],
        providers: [
            historico_tributos_service_1.HistoricoTributosService,
        ],
        exports: [historico_tributos_service_1.HistoricoTributosService]
    })
], HistoricoTributosModule);
exports.HistoricoTributosModule = HistoricoTributosModule;
//# sourceMappingURL=historico-tributos.module.js.map