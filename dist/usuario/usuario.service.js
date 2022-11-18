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
exports.UsuarioService = exports.Usuario = void 0;
const common_1 = require("@nestjs/common");
const api_database_service_1 = require("../database/api-database.service");
class Usuario {
}
exports.Usuario = Usuario;
let UsuarioService = class UsuarioService {
    constructor(databaseService) {
        this.databaseService = databaseService;
        this.credentials = {
            email: 'thislucasme@gmail.com',
            nome: 'lucas',
            id: 1,
            senha: '1234'
        };
    }
    async findUserById(id) {
        if (id === this.credentials.id)
            return this.credentials;
        return null;
    }
    async findUserByEmail(email) {
        if (email === this.credentials.email)
            return this.credentials;
        return null;
    }
    async teste() {
        return await this.databaseService.getConnection().select().table('cliente_entity');
    }
};
UsuarioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [api_database_service_1.ApiDatabaseService])
], UsuarioService);
exports.UsuarioService = UsuarioService;
//# sourceMappingURL=usuario.service.js.map