"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const config_1 = require("../../utils/config");
const pool = new pg_1.Pool({
    user: config_1.config.dbUser,
    host: config_1.config.dbHost,
    database: config_1.config.dbName,
    password: config_1.config.dbPassword,
    //   port: Number(process.env.DB_PORT),
    ssl: {
        rejectUnauthorized: config_1.config.dbSsl,
    },
});
function verifyConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = yield pool.connect();
            console.log('Conectado ao banco de dados');
            client.release();
        }
        catch (error) {
            console.error(`Falha ao tentar se conectar ao banco de dados: ${error}`);
        }
    });
}
verifyConnection();
exports.default = pool;
//# sourceMappingURL=pg.pool.js.map