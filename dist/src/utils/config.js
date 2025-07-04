"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    userApiBaseUrl: process.env.USER_API_BASE_URL,
    userApiKey: process.env.USER_API_KEY,
    userApiAdminEmail: process.env.USER_API_ADMIN_EMAIL,
    userApiAdminPass: process.env.USER_API_ADMIN_PASS,
    emailService: process.env.EMAIL_SERVICE,
    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASS,
    secretKey: process.env.SECRET_KEY,
};
//# sourceMappingURL=config.js.map