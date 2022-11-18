"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlagModule = void 0;
const flag_controller_1 = require("./flag.controller");
const flag_service_1 = require("./flag.service");
const common_1 = require("@nestjs/common");
const cotacao_service_1 = require("../cotacao/cotacao.service");
const database_cotacao_service_1 = require("../database/database-cotacao.service");
const cotacao_module_1 = require("../cotacao/cotacao.module");
const contrato_service_1 = require("../contrato/contrato.service");
const cripto_service_1 = require("../cripto/cripto.service");
const site_success_database_service_1 = require("../database/site-success-database.service");
const success_database_service_1 = require("../database/success-database.service");
const flagutil_service_1 = require("./flagutil.service");
let FlagModule = class FlagModule {
};
FlagModule = __decorate([
    (0, common_1.Module)({
        imports: [cotacao_module_1.CotacaoModule],
        controllers: [flag_controller_1.FlagController],
        providers: [flag_service_1.FlagService, flagutil_service_1.FlagutilService, cotacao_service_1.CotacaoService, database_cotacao_service_1.DatabaseCotacaoService, contrato_service_1.ContratoService, cripto_service_1.CriptoService, site_success_database_service_1.SiteSuccessDatabaseService, success_database_service_1.SuccessDatabaseService],
    })
], FlagModule);
exports.FlagModule = FlagModule;
//# sourceMappingURL=flag.module.js.map