"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empresa = exports.ContratoRegistro = void 0;
const openapi = require("@nestjs/swagger");
class ContratoRegistro {
    static _OPENAPI_METADATA_FACTORY() {
        return { codigo: { required: true, type: () => String }, status: { required: true, type: () => String }, cliente: { required: true, type: () => String }, cnpj: { required: true, type: () => String } };
    }
}
exports.ContratoRegistro = ContratoRegistro;
class Empresa {
    static _OPENAPI_METADATA_FACTORY() {
        return { codigo: { required: true, type: () => String }, razao: { required: true, type: () => String }, empresa: { required: true, type: () => String }, cnpj: { required: true, type: () => String }, cidade: { required: true, type: () => String } };
    }
}
exports.Empresa = Empresa;
//# sourceMappingURL=contrato.dto.js.map