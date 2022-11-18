"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceModule = void 0;
const price_controller_1 = require("./price.controller");
const price_service_1 = require("./price.service");
const common_1 = require("@nestjs/common");
const cliente_service_1 = require("../cliente/cliente.service");
const contrato_service_1 = require("../contrato/contrato.service");
const cotacao_service_1 = require("../cotacao/cotacao.service");
const database_cotacao_service_1 = require("../database/database-cotacao.service");
const site_success_database_service_1 = require("../database/site-success-database.service");
const success_database_service_1 = require("../database/success-database.service");
const cripto_module_1 = require("../cripto/cripto.module");
let PriceModule = class PriceModule {
};
PriceModule = __decorate([
    (0, common_1.Module)({
        imports: [cripto_module_1.CriptoModule],
        controllers: [price_controller_1.PriceController],
        providers: [price_service_1.PriceService, cliente_service_1.ClienteService, site_success_database_service_1.SiteSuccessDatabaseService, success_database_service_1.SuccessDatabaseService, database_cotacao_service_1.DatabaseCotacaoService, cotacao_service_1.CotacaoService, contrato_service_1.ContratoService],
    })
], PriceModule);
exports.PriceModule = PriceModule;
//# sourceMappingURL=price.module.js.map