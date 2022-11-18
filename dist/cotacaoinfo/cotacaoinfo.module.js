"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CotacaoinfoModule = void 0;
const cotacaoinfo_controller_1 = require("./cotacaoinfo.controller");
const cotacaoinfo_service_1 = require("./cotacaoinfo.service");
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database/database.module");
const connection_service_1 = require("../database/connection.service");
const cripto_service_1 = require("../cripto/cripto.service");
let CotacaoinfoModule = class CotacaoinfoModule {
};
CotacaoinfoModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [cotacaoinfo_controller_1.CotacaoinfoController,],
        providers: [
            cotacaoinfo_service_1.CotacaoinfoService, connection_service_1.ConnectionService, cripto_service_1.CriptoService
        ],
    })
], CotacaoinfoModule);
exports.CotacaoinfoModule = CotacaoinfoModule;
//# sourceMappingURL=cotacaoinfo.module.js.map