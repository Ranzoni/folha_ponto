"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.authenticateUser = authenticateUser;
exports.createUser = createUser;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../utils/config");
const message_validation_error_1 = __importStar(require("../errors/message-validation.error"));
const api = axios_1.default.create({
    baseURL: config_1.config.userApiBaseUrl,
});
function authenticateUser(authData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield api.post('/user/authenticate', authData, {
                headers: {
                    'Chave-API': config_1.config.userApiKey
                }
            });
            const data = {
                user: {
                    id: response.data.user.id,
                    name: response.data.user.name,
                    email: response.data.user.email
                },
                token: response.data.token
            };
            return data;
        }
        catch (error) {
            handleError(error, `Não foi possível autenticar o usuário: ${error}`, `Erro ao autenticar usuário: ${error}`);
        }
    });
}
function createUser(token, newUser) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bodyData = {
                name: newUser.name,
                username: newUser.email.substring(0, newUser.email.indexOf('@')),
                email: newUser.email,
                password: newUser.password
            };
            const response = yield api.post('/user', bodyData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Chave-API': config_1.config.userApiKey
                }
            });
            const user = {
                id: response.data.id,
                name: response.data.name,
                email: response.data.email
            };
            return user;
        }
        catch (error) {
            handleError(error, `Não foi possível criar o usuário: ${error}`, `Erro ao criar o usuário: ${error}`);
        }
    });
}
function handleError(error, responseError, notMappedError) {
    if (error.response) {
        if (error.response.status === 422) {
            throw new message_validation_error_1.MessageValidationError((0, message_validation_error_1.default)(error.response.data));
        }
        if (error.response.status === 401) {
            try {
                throw new message_validation_error_1.MessageValidationError((0, message_validation_error_1.default)(error.response.data), 401);
            }
            catch (error) {
                throw new message_validation_error_1.MessageValidationError(['Acesso negado'], 401);
            }
        }
        throw new message_validation_error_1.MessageValidationError([responseError], 400);
    }
    throw new message_validation_error_1.MessageValidationError([notMappedError], 500);
}
//# sourceMappingURL=user-api.js.map