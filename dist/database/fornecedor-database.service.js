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
exports.FornecedorDatabaseService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const knex_1 = require("knex");
let FornecedorDatabaseService = class FornecedorDatabaseService {
    constructor(configService) {
        const host = configService.get('fornecedor.host');
        if (!host) {
            throw new Error('Variável de ambiente FORNECEDOR_HOST não configurada!');
        }
        const port = configService.get('fornecedor.port');
        if (!port)
            throw new Error('VARIAVEL DE AMBIENTE FORNECEDOR_PORT NÃO CONFIGURADA!');
        const user = configService.get('fornecedor.user');
        if (!user)
            throw new Error('VARIAVEL DE AMBIENTE FORNECEDOR_USER NÃO CONFIGURADA!');
        const password = configService.get('fornecedor.password');
        if (!password)
            throw new Error('VARIAVEL DE AMBIENTE FORNECEDOR_PASSWORD NÃO CONFIGURADA!');
        const database = configService.get('fornecedor.name');
        if (!database)
            throw new Error('VARIAVEL DE AMBIENTE FORNECEDOR_NAME NÃO CONFIGURADA!');
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
FornecedorDatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FornecedorDatabaseService);
exports.FornecedorDatabaseService = FornecedorDatabaseService;
//# sourceMappingURL=fornecedor-database.service.js.map