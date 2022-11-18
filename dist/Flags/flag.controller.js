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
exports.FlagController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const types_1 = require("../models/types");
const flag_service_1 = require("./flag.service");
let FlagController = class FlagController {
    constructor(flagService) {
        this.flagService = flagService;
    }
    async verificarFlags(body, res) {
        const result = await this.flagService.consultarFlags(body);
        res.status(common_1.HttpStatus.ACCEPTED).send(result);
    }
    async finalizarCotacao(body, res) {
        const result = await this.flagService.finalizarCotacao(body);
        if (result.data === null) {
            if (result.code === 404) {
                res.status(common_1.HttpStatus.NOT_FOUND).send({ data: 404 });
                return;
            }
            if (result.code === 400) {
                res.status(common_1.HttpStatus.BAD_REQUEST).send({ data: 400, msg: "Confira os dados da payload" });
                return;
            }
        }
        res.status(common_1.HttpStatus.OK).send({ data: 201 });
        return result;
    }
};
__decorate([
    (0, common_1.Post)('verificar-flags'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FlagController.prototype, "verificarFlags", null);
__decorate([
    (0, common_1.Post)('finalizar-cotacao'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FlagController.prototype, "finalizarCotacao", null);
FlagController = __decorate([
    (0, common_1.Controller)('flag'),
    __metadata("design:paramtypes", [flag_service_1.FlagService])
], FlagController);
exports.FlagController = FlagController;
//# sourceMappingURL=flag.controller.js.map