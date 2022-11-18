"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knex = void 0;
const knex_1 = require("knex");
exports.knex = (0, knex_1.default)({
    client: 'mysql2',
    connection: {
        host: "192.168.254.70",
        port: 3306,
        user: "root",
        password: "1234",
        database: "api"
    }
});
//# sourceMappingURL=db.js.map