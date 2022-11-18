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
exports.CriptoService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const hbcrypt_1 = require("./hbcrypt");
const cripto_1 = require("../common/cripto");
let CriptoService = class CriptoService {
    constructor(configService) {
        const chave = configService.get('chaveCripto');
        if (!chave) {
            throw new Error('Chave de criptografia nao configurada! configurar env var CHAVE_CRIPTO');
        }
        this.chaveCripto = chave;
    }
    stripAnsi(str) {
        return str.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqsry=><]/g, '');
    }
    async publicEncript(cifra, chave) {
        const { stderr, stdout } = await (0, hbcrypt_1.asyncExec)(`${hbcrypt_1.criptLinuxExe} ${cifra} ${chave}`);
        if (stderr) {
        }
        return this.stripAnsi(stdout);
    }
    async publicDecript(cifra, chave) {
        const { stderr, stdout } = await (0, hbcrypt_1.asyncExec)(`${hbcrypt_1.decriptLinuxExe} ${cifra} ${chave}`);
        if (stderr) {
        }
        return this.stripAnsi(stdout);
    }
    async encriptar(cifra) {
        return this.publicEncript(cifra, this.chaveCripto);
    }
    async decriptar(cifra) {
        return this.publicDecript(cifra, this.chaveCripto);
    }
    async restaurar(texto) {
        return this.restaurar(texto);
    }
};
CriptoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CriptoService);
exports.CriptoService = CriptoService;
//# sourceMappingURL=cripto.service.js.map