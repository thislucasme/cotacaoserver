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
exports.FornecedorService = void 0;
const common_1 = require("@nestjs/common");
const fornecedor_database_service_1 = require("../database/fornecedor-database.service");
const types_1 = require("../models/types");
let FornecedorService = class FornecedorService {
    constructor(databaseFornecedor) {
        this.databaseFornecedor = databaseFornecedor;
    }
    async findFornecedorByEmail(email) {
        const knex = this.databaseFornecedor.getConnection();
        const fornecedor = await knex('fornecedores').select().where('email', email).first();
        return fornecedor;
    }
    async findFornecedorByEmailCredencials(email) {
        const knex = this.databaseFornecedor.getConnection();
        const credenciais = await knex('fornecedorescredencials').select().where('email', email).first();
        return credenciais;
    }
    async findFornecedorByEmailCredencialsTeste(email) {
        return { email: "lucas@gmail.com", senha: "1234" };
    }
};
FornecedorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [fornecedor_database_service_1.FornecedorDatabaseService])
], FornecedorService);
exports.FornecedorService = FornecedorService;
//# sourceMappingURL=fornecedor.service.js.map