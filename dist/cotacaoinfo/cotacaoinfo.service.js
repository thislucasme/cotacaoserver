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
exports.CotacaoinfoService = void 0;
const common_1 = require("@nestjs/common");
const api_database_service_copy_1 = require("../database/api-database.service copy");
const connection_service_1 = require("../database/connection.service");
const site_success_database_service_1 = require("../database/site-success-database.service");
let CotacaoinfoService = class CotacaoinfoService {
    constructor(connectionService) {
        this.connectionService = connectionService;
    }
    async salvarObservacaoTempoEntrega(body) {
        const result = await this.connectionService.getConexaoCliente(body.contratoEmpresa);
        const rows = await result.raw('select hex(codigo6) from deic01');
        return rows[0];
    }
};
CotacaoinfoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [connection_service_1.ConnectionService])
], CotacaoinfoService);
exports.CotacaoinfoService = CotacaoinfoService;
//# sourceMappingURL=cotacaoinfo.service.js.map