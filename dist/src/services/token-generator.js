"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../utils/config");
function generateToken(id, email) {
    const payload = {
        id: id,
        email: email
    };
    const secretKey = config_1.config.secretKey;
    if (!secretKey)
        throw new Error('A chave secreta não está definida no arquivo de configuração.');
    return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '1h' });
}
//# sourceMappingURL=token-generator.js.map