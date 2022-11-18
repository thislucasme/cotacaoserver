"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criptoUmDto = void 0;
const openapi = require("@nestjs/swagger");
class criptoUmDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { cifra: { required: true, type: () => String }, chave: { required: true, type: () => String } };
    }
}
exports.criptoUmDto = criptoUmDto;
//# sourceMappingURL=cripto.dto.js.map