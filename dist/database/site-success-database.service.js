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
exports.SiteSuccessDatabaseService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const knex_1 = require("knex");
const knexCache_1 = require("./knexCache");
let SiteSuccessDatabaseService = class SiteSuccessDatabaseService {
    constructor(configService) {
        const host = configService.get('siteSuccess.host');
        if (!host)
            throw new Error('VARIAVEL DE AMBIENTE SITE_SUCCESS_DB_HOST NÃO CONFIGURADA!');
        const port = configService.get('siteSuccess.port');
        if (!port)
            throw new Error('VARIAVEL DE AMBIENTE SITE_SUCCESS_DB_PORT NÃO CONFIGURADA!');
        const user = configService.get('siteSuccess.user');
        if (!user)
            throw new Error('VARIAVEL DE AMBIENTE SITE_SUCCESS_DB_USER NÃO CONFIGURADA!');
        const password = configService.get('siteSuccess.password');
        if (!password)
            throw new Error('VARIAVEL DE AMBIENTE SITE_SUCCESS_DB_PASSWORD NÃO CONFIGURADA!');
        const database = configService.get('siteSuccess.name');
        if (!database)
            throw new Error('VARIAVEL DE AMBIENTE SITE_SUCCESS_DB_NAME NÃO CONFIGURADA!');
        this.registroRestaurado = {
            servidor: host,
            banco: database,
            usuario: user,
            senha: password,
            porta: port,
            servidorHex: host,
            bcohex: database
        };
        this.knex = (0, knex_1.default)({
            client: 'mysql2',
            connection: {
                host,
                port,
                user,
                password,
                database,
            },
        });
    }
    async getConnection() {
        const conn = await (0, knexCache_1.getOrCreateKnexInstance)(this.registroRestaurado);
        return conn;
    }
    getConnectionDefa() {
        return this.knex;
    }
};
SiteSuccessDatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SiteSuccessDatabaseService);
exports.SiteSuccessDatabaseService = SiteSuccessDatabaseService;
//# sourceMappingURL=site-success-database.service.js.map