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
exports.DatabaseCotacaoService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const knex_1 = require("knex");
let DatabaseCotacaoService = class DatabaseCotacaoService {
    constructor(configService) {
        const host = configService.get('databaseTeste.host');
        if (!host) {
            throw new Error('VARIÁVEL DE AMBIENTE DATABASE_HOST_TESTE NÃO FOI CONFIGURADA');
        }
        const port = configService.get('databaseTeste.port');
        if (!port) {
            throw new Error('VARIÁVEL DE AMBIENTE DATABASE_PORT_TESTE NÃO FOI CONFIGURADA');
        }
        const user = configService.get('databaseTeste.user');
        if (!user) {
            throw new Error('VARIÁVEL DE AMBIENTE DATABASE_USER_TESTE NÃO FOI CONFIGURADA');
        }
        const password = configService.get('databaseTeste.password');
        if (!password) {
            throw new Error('VARIÁVEL DE AMBIENTE DATABASE_PASSWORD_TESTE NÃO FOI CONFIGURADA');
        }
        const database = configService.get('databaseTeste.name');
        if (!database) {
            throw new Error('VARIÁVEL DE AMBIENTE DATABASE_NAME_TESTE NÃO FOI CONFIGURADA');
        }
        this.knex = (0, knex_1.default)({
            client: 'mysql2',
            connection: {
                host: host,
                port: port,
                user: user,
                password: password,
                database: database
            }
        });
    }
    getConnection() {
        return this.knex;
    }
};
DatabaseCotacaoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], DatabaseCotacaoService);
exports.DatabaseCotacaoService = DatabaseCotacaoService;
//# sourceMappingURL=database-cotacao.service.js.map