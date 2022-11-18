"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncExec = exports.criptLinuxExe = exports.decriptLinuxExe = void 0;
const child_process_1 = require("child_process");
const path_1 = require("path");
const util_1 = require("util");
exports.decriptLinuxExe = (0, path_1.join)(__dirname, 'descriptografia.linux');
exports.criptLinuxExe = (0, path_1.join)(__dirname, 'criptografia.linux');
exports.asyncExec = (0, util_1.promisify)(child_process_1.exec);
//# sourceMappingURL=hbcrypt.js.map