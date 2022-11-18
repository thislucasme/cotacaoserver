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
exports.PriceController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const cliente_service_1 = require("../cliente/cliente.service");
const cotacao_service_1 = require("../cotacao/cotacao.service");
const types = require("../models/types");
const types_1 = require("../models/types");
const price_service_1 = require("./price.service");
let PriceController = class PriceController {
    constructor(clienteService, cotacaoService, priceService) {
        this.clienteService = clienteService;
        this.cotacaoService = cotacaoService;
        this.priceService = priceService;
    }
    async getAllItensFromCotacao(codCotacao, codFornecedor, codEmpresa, codContrato) {
        var _a, _b;
        const body = {
            codigo: codCotacao,
            fornecedor: codFornecedor,
            flag: '',
            contratoEmpresa: codContrato,
            codigoEmpresa: codEmpresa
        };
        const total = await this.priceService.calcularTotal(body, false);
        const frete = await this.priceService.calcularFrete(body);
        const data = await this.priceService.getItensCotacao(codCotacao, codFornecedor, codContrato, codEmpresa);
        const totalDesconto = await this.priceService.calcularTotalDesconto(body);
        const dataTratado = data[0];
        let isReady = true;
        for (let i = 0; i < dataTratado.length; i++) {
            if (((_a = dataTratado[i]) === null || _a === void 0 ? void 0 : _a.valordoproduto) === 0 || ((_b = dataTratado[i]) === null || _b === void 0 ? void 0 : _b.valordoproduto) === null) {
                isReady = false;
                break;
            }
        }
        return [data, total, totalDesconto, frete, [{ "isReady": isReady }], [{ "formaPagamento": data[0][0].formapagamento }], [{ "numeroCotacao": data[0][0].codigo }]];
    }
    async updateItemCotacao(body) {
        try {
            const result = await this.cotacaoService.updateItemCotacao(body);
            return result;
        }
        catch (e) {
            return { error: e };
        }
    }
    async readToSend(body) {
        try {
            const result = await this.cotacaoService.isAllPreenchido(body);
            return result;
        }
        catch (e) {
            return { error: e };
        }
    }
};
__decorate([
    (0, common_1.Get)('findby/:codCotacao/:codFornecedor/:codContrato/:codEmpresa'),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Param)('codCotacao')),
    __param(1, (0, common_1.Param)('codFornecedor')),
    __param(2, (0, common_1.Param)('codEmpresa')),
    __param(3, (0, common_1.Param)('codContrato')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], PriceController.prototype, "getAllItensFromCotacao", null);
__decorate([
    (0, common_1.Post)('update'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PriceController.prototype, "updateItemCotacao", null);
__decorate([
    (0, common_1.Get)('ready-to-send'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PriceController.prototype, "readToSend", null);
PriceController = __decorate([
    (0, common_1.Controller)('price'),
    __metadata("design:paramtypes", [cliente_service_1.ClienteService, cotacao_service_1.CotacaoService, price_service_1.PriceService])
], PriceController);
exports.PriceController = PriceController;
//# sourceMappingURL=price.controller.js.map