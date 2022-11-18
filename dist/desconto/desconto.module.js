"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DescontoModule = void 0;
const desconto_controller_1 = require("./desconto.controller");
const desconto_service_1 = require("./desconto.service");
const common_1 = require("@nestjs/common");
const cripto_module_1 = require("../cripto/cripto.module");
const contrato_service_1 = require("../contrato/contrato.service");
const cliente_service_1 = require("../cliente/cliente.service");
const site_success_database_service_1 = require("../database/site-success-database.service");
const success_database_service_1 = require("../database/success-database.service");
const database_cotacao_service_1 = require("../database/database-cotacao.service");
const cotacao_service_1 = require("../cotacao/cotacao.service");
const price_service_1 = require("../price/price.service");
const util_service_1 = require("./util.service");
let DescontoModule = class DescontoModule {
};
DescontoModule = __decorate([
    (0, common_1.Module)({
        imports: [cripto_module_1.CriptoModule],
        controllers: [desconto_controller_1.DescontoController],
        providers: [util_service_1.UtilService, desconto_service_1.DescontoService, price_service_1.PriceService, cliente_service_1.ClienteService, site_success_database_service_1.SiteSuccessDatabaseService, success_database_service_1.SuccessDatabaseService, database_cotacao_service_1.DatabaseCotacaoService, cotacao_service_1.CotacaoService, contrato_service_1.ContratoService],
    })
], DescontoModule);
exports.DescontoModule = DescontoModule;
//# sourceMappingURL=desconto.module.js.map