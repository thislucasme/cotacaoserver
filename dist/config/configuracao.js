"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    var _a, _b, _c, _d, _e;
    return ({
        chaveCripto: process.env.CHAVE_CRIPTO,
        databaseTeste: {
            host: process.env.DATABASE_HOST_TESTE,
            port: parseInt((_a = process.env.DATABASE_PORT_TESTE) !== null && _a !== void 0 ? _a : '3306', 10),
            user: process.env.DATABASE_USER_TESTE,
            password: process.env.DATABASE_PASSWORD_TESTE,
            name: process.env.DATABASE_NAME_TESTE,
        },
        database: {
            host: process.env.DATABASE_HOST,
            port: parseInt((_b = process.env.DATABASE_PORT) !== null && _b !== void 0 ? _b : '3306', 10),
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            name: process.env.DATABASE_NAME,
        },
        success: {
            host: process.env.SUCCESS_DB_HOST,
            port: parseInt((_c = process.env.SUCCESS_DB_PORT) !== null && _c !== void 0 ? _c : '3306', 10),
            user: process.env.SUCCESS_DB_USER,
            password: process.env.SUCCESS_DB_PASSWORD,
            name: process.env.SUCCESS_DB_NAME,
        },
        siteSuccess: {
            host: process.env.SITE_SUCCESS_DB_HOST,
            port: parseInt((_d = process.env.SITE_SUCCESS_DB_PORT) !== null && _d !== void 0 ? _d : '3306', 10),
            user: process.env.SITE_SUCCESS_DB_USER,
            password: process.env.SITE_SUCCESS_DB_PASSWORD,
            name: process.env.SITE_SUCCESS_DB_NAME,
        },
        fornecedor: {
            host: process.env.FORNECEDOR_HOST,
            port: parseInt((_e = process.env.FORNECEDOR_PORT) !== null && _e !== void 0 ? _e : '3306', 10),
            user: process.env.FORNECEDOR_USER,
            password: process.env.FORNECEDOR_PASSWORD,
            name: process.env.FORNECEDOR_NAME,
        }
    });
};
//# sourceMappingURL=configuracao.js.map