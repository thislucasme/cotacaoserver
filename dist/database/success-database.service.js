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
exports.SuccessDatabaseService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const knex_1 = require("knex");
let SuccessDatabaseService = class SuccessDatabaseService {
    constructor(configService) {
        const host = configService.get('success.host');
        if (!host)
            throw new Error('VARIAVEL DE AMBIENTE SUCCESS_DB_HOST NÃO CONFIGURADA!');
        const port = configService.get('success.port');
        if (!port)
            throw new Error('VARIAVEL DE AMBIENTE SUCCESS_DB_PORT NÃO CONFIGURADA!');
        const user = configService.get('success.user');
        if (!user)
            throw new Error('VARIAVEL DE AMBIENTE SUCCESS_DB_USER NÃO CONFIGURADA!');
        const password = configService.get('success.password');
        if (!password)
            throw new Error('VARIAVEL DE AMBIENTE SUCCESS_DB_PASSWORD NÃO CONFIGURADA!');
        const database = configService.get('success.name');
        if (!database)
            throw new Error('VARIAVEL DE AMBIENTE SUCCESS_DB_NAME NÃO CONFIGURADA!');
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
    getConnection() {
        return this.knex;
    }
};
SuccessDatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SuccessDatabaseService);
exports.SuccessDatabaseService = SuccessDatabaseService;
//# sourceMappingURL=success-database.service.js.map