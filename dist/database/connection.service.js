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
exports.ConnectionService = void 0;
const common_1 = require("@nestjs/common");
const cripto_service_1 = require("../cripto/cripto.service");
const knexCache_1 = require("./knexCache");
const site_success_database_service_1 = require("./site-success-database.service");
let ConnectionService = class ConnectionService {
    constructor(siteSuccessDatabase, cripto) {
        this.siteSuccessDatabase = siteSuccessDatabase;
        this.cripto = cripto;
    }
    async getDados() {
        const knex = await this.siteSuccessDatabase.getConnection();
        const registro = await knex('cfgw').select();
        return registro;
    }
    async getDadosConexaoCache(contrato) {
        const knext = await this.siteSuccessDatabase.getConnection();
        const registro = await knext('cfgw')
            .select([
            {
                servidor: knext.raw('hex(serbco)'),
                banco: knext.raw('hex(bcodad)'),
                usuario: knext.raw('hex(usebco)'),
                senha: knext.raw('hex( pasbco)'),
                porta: knext.raw('hex(porbco)'),
                dataSincronismo: knext.raw('hex(datsinbco)'),
            },
        ])
            .where('tposer', 'SDC')
            .andWhere(knext.raw('hex(bcodad)'), '=', contrato)
            .andWhere('sr_deleted', '<>', 'T')
            .first();
        if (!registro)
            return;
        const registroRestaurado = {
            servidor: (await this.cripto.decriptar(registro.servidor)).trimEnd(),
            banco: (await this.cripto.decriptar(registro.banco)).trimEnd(),
            usuario: (await this.cripto.decriptar(registro.usuario)).trimEnd(),
            senha: (await this.cripto.decriptar(registro.senha)).trimEnd(),
            porta: (await this.cripto.decriptar(registro.porta)).trimEnd(),
            servidorHex: registro.servidor,
            bcohex: registro.banco,
            dataSincronismo: (await this.cripto.decriptar(registro.dataSincronismo)).trimEnd(),
        };
        return registroRestaurado;
    }
    async getConexaoCliente(contrato) {
        const dadosConexao = await this.getDadosConexaoCache(contrato);
        if (!dadosConexao)
            throw new common_1.NotFoundException('Dados de conexão com o banco de dados do cliente não encontrados!');
        const knex = await (0, knexCache_1.getOrCreateKnexInstance)(dadosConexao);
        return knex;
    }
};
ConnectionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [site_success_database_service_1.SiteSuccessDatabaseService,
        cripto_service_1.CriptoService])
], ConnectionService);
exports.ConnectionService = ConnectionService;
//# sourceMappingURL=connection.service.js.map