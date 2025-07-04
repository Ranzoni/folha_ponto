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
exports.executeAuthentication = executeAuthentication;
const user_api_1 = require("../../data/user-api");
const message_validation_error_1 = require("../../errors/message-validation.error");
function executeAuthentication(authData) {
    return __awaiter(this, void 0, void 0, function* () {
        validateAuthentication(authData);
        return yield (0, user_api_1.authenticateUser)(authData);
    });
}
function validateAuthentication(authData) {
    const validations = [];
    if (!authData.usernameOrEmail) {
        validations.push("O e-mail não foi informado.");
    }
    if (!authData.password) {
        validations.push("A senha não foi informada.");
    }
    if (validations.length > 0) {
        throw new message_validation_error_1.MessageValidationError(validations);
    }
}
//# sourceMappingURL=authenticate.js.map