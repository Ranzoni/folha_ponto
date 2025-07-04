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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../services/users/authenticate");
const message_validation_error_1 = require("../errors/message-validation.error");
const security_1 = require("../utils/security");
const create_user_1 = __importDefault(require("../services/users/create-user"));
const router = (0, express_1.Router)();
router.post('/user/authenticate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, authenticate_1.executeAuthentication)(req.body);
        res.json(response);
    }
    catch (error) {
        if (error instanceof message_validation_error_1.MessageValidationError) {
            res.status(error.statusCode).json(error.toJSON());
        }
        res.status(500).json({ error: `Erro ao autenticar usuário: ${error}` });
    }
}));
router.post('/user', security_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiUrl = `${(0, security_1.getUriApi)(req)}/active`;
        const response = yield (0, create_user_1.default)((0, security_1.getToken)(req), req.body, apiUrl);
        res.json(response);
    }
    catch (error) {
        if (error instanceof message_validation_error_1.MessageValidationError) {
            res.status(error.statusCode).json(error.toJSON());
        }
        res.status(500).json({ error: `Erro ao autenticar usuário: ${error}` });
    }
}));
exports.default = router;
//# sourceMappingURL=users.routes.js.map