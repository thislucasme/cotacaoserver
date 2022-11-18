"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const api_database_service_1 = require("./api-database.service");
const common_1 = require("@nestjs/common");
const site_success_database_service_1 = require("./site-success-database.service");
const success_database_service_1 = require("./success-database.service");
const fornecedor_database_service_1 = require("./fornecedor-database.service");
const database_cotacao_service_1 = require("./database-cotacao.service");
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    (0, common_1.Module)({
        providers: [
            api_database_service_1.ApiDatabaseService, database_cotacao_service_1.DatabaseCotacaoService,
            site_success_database_service_1.SiteSuccessDatabaseService, success_database_service_1.SuccessDatabaseService,
            fornecedor_database_service_1.FornecedorDatabaseService
        ],
        exports: [
            api_database_service_1.ApiDatabaseService, database_cotacao_service_1.DatabaseCotacaoService,
            site_success_database_service_1.SiteSuccessDatabaseService, success_database_service_1.SuccessDatabaseService,
            fornecedor_database_service_1.FornecedorDatabaseService
        ]
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=database.module.js.map