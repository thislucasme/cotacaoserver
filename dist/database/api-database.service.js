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
exports.ApiDatabaseService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const knex_1 = require("knex");
let ApiDatabaseService = class ApiDatabaseService {
    constructor(configService) {
        const host = configService.get('database.host');
        if (!host) {
            throw new Error('VARIÁVEL DE AMBIENTE DATABASE_HOST NÃO FOI CONFIGURADA');
        }
        const port = configService.get('database.port');
        if (!port) {
            throw new Error('VARIÁVEL DE AMBIENTE DATABASE_PORT NÃO FOI CONFIGURADA');
        }
        const user = configService.get('database.user');
        if (!user) {
            throw new Error('VARIÁVEL DE AMBIENTE DATABASE_USER NÃO FOI CONFIGURADA');
        }
        const password = configService.get('database.password');
        if (!password) {
            throw new Error('VARIÁVEL DE AMBIENTE DATABASE_PASSWORD NÃO FOI CONFIGURADA');
        }
        const database = configService.get('database.name');
        if (!database) {
            throw new Error('VARIÁVEL DE AMBIENTE DATABASE_NAME NÃO FOI CONFIGURADA');
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
ApiDatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ApiDatabaseService);
exports.ApiDatabaseService = ApiDatabaseService;
//# sourceMappingURL=api-database.service.js.map