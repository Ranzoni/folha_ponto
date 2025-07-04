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
exports.authenticateUser = authenticateUser;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
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
            const data = response.data;
            return data.token;
        }
        catch (error) {
            console.error(`Não foi possível autenticar o usuário: ${error}`);
        }
    });
}
// async function createUser(newUser: CreateUser) {
//   try {
//     const response = await api.post('/user', newUser, {
//         headers: {
//             Authorization: `Bearer ${}`
//         }
//     })
//     console.log(response.data)
//   } catch (error) {
//     console.error('Erro na requisição:', error)
//   }
// }
