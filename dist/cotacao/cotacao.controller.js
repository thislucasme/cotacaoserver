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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CotacaoController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const cripto_1 = require("../common/cripto");
const cotacao_service_1 = require("./cotacao.service");
const moment = require("moment");
moment.locale('pt-br');
let CotacaoController = class CotacaoController {
    constructor(cotacaoService) {
        this.cotacaoService = cotacaoService;
    }
    async enviar() {
        const result = await this.cotacaoService.enviarEmail();
        return result;
    }
    async receber(dadosSuccess, res) {
        const result = await this.cotacaoService.enviarEmailParaFornecedores(dadosSuccess);
        if (result.empresa.contratoEmpresaSuccess === null) {
            throw new common_1.NotFoundException(`Contrato não existe na base de dados`);
        }
        else {
            for (let fornecedor of result.fornecedores) {
                if (fornecedor.enviado === false) {
                    res.status(common_1.HttpStatus.PARTIAL_CONTENT).send(result);
                    return;
                }
            }
            res.status(common_1.HttpStatus.OK).send(result);
        }
    }
    async converter(body) {
        return (0, cripto_1.restaurar)(body.cifra);
    }
    async getData(body) {
        const isValid = moment(moment(body.vencimento)).isValid();
        if (isValid) {
            let vencimento;
            if (!body.vencimento) {
                vencimento = moment().add(30, 'days');
            }
            else {
                console.log(moment(moment(body.vencimento)).isValid());
                vencimento = moment(body.vencimento);
                console.log(vencimento.format('L'));
            }
            const isVencido = this.isVencido(vencimento);
            return { vencimento, isVencido };
        }
        else {
            return { "msg": "data inválida" };
        }
    }
    isVencido(vencimento) {
        const now = moment();
        console.log();
        var diffDays = moment.duration(vencimento.diff(now));
        if (diffDays.asHours() < 0) {
            return true;
        }
        return false;
    }
};
__decorate([
    (0, common_1.Get)('enviar-email'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CotacaoController.prototype, "enviar", null);
__decorate([
    (0, common_1.Post)('/realizar-envio'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CotacaoController.prototype, "receber", null);
__decorate([
    (0, common_1.Get)('chave'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CotacaoController.prototype, "converter", null);
__decorate([
    (0, common_1.Get)('data'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CotacaoController.prototype, "getData", null);
CotacaoController = __decorate([
    (0, common_1.Controller)("cotacao"),
    __metadata("design:paramtypes", [cotacao_service_1.CotacaoService])
], CotacaoController);
exports.CotacaoController = CotacaoController;
//# sourceMappingURL=cotacao.controller.js.map