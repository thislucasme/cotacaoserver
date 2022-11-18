"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FornecedorModule = void 0;
const fornecedor_controller_1 = require("./fornecedor.controller");
const fornecedor_service_1 = require("./fornecedor.service");
const common_1 = require("@nestjs/common");
const fornecedor_database_service_1 = require("../database/fornecedor-database.service");
const auth_service_1 = require("../auth/auth.service");
const auth_module_1 = require("../auth/auth.module");
let FornecedorModule = class FornecedorModule {
};
FornecedorModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule],
        controllers: [fornecedor_controller_1.FornecedorController],
        providers: [fornecedor_service_1.FornecedorService, fornecedor_database_service_1.FornecedorDatabaseService],
        exports: [fornecedor_service_1.FornecedorService]
    })
], FornecedorModule);
exports.FornecedorModule = FornecedorModule;
//# sourceMappingURL=fornecedor.module.js.map