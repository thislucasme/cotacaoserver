"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateKnexInstance = exports.saveKnexInstance = exports.getKnex = void 0;
const knex_1 = require("knex");
const knex_paginate_1 = require("knex-paginate");
const contrato_dto_1 = require("../contrato/contrato.dto");
const knexCache = new Map();
const getKnex = (contrato) => {
    return knexCache.get(contrato);
};
exports.getKnex = getKnex;
const saveKnexInstance = (contrato, instance) => {
    knexCache.set(contrato, instance);
};
exports.saveKnexInstance = saveKnexInstance;
const getOrCreateKnexInstance = async (info) => {
    const numeroContrato = info.banco;
    let knex = (0, exports.getKnex)(numeroContrato);
    if (!knex) {
        knex = (0, knex_1.default)({
            client: 'mysql2',
            connection: {
                database: info.banco,
                host: info.servidor,
                port: parseInt(info.porta || '3306', 10),
                user: info.usuario,
                password: info.senha,
                charset: 'latin1',
            },
        });
        if (!knex.queryBuilder().paginate) {
            (0, knex_paginate_1.attachPaginate)();
        }
        (0, exports.saveKnexInstance)(numeroContrato, knex);
    }
    return knex;
};
exports.getOrCreateKnexInstance = getOrCreateKnexInstance;
//# sourceMappingURL=knexCache.js.map