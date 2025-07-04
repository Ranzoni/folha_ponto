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
exports.default = executeCreation;
const user_api_1 = require("../../data/user-api");
const message_validation_error_1 = require("../../errors/message-validation.error");
function executeCreation(token, newUser) {
    return __awaiter(this, void 0, void 0, function* () {
        validateCreation(newUser);
        return yield (0, user_api_1.createUser)(token, newUser);
    });
}
function validateCreation(newUser) {
    const validations = [];
    if (!newUser.name) {
        validations.push("O nome não foi informado.");
    }
    if (!newUser.email) {
        validations.push("O e-mail não foi informado.");
    }
    if (!newUser.password) {
        validations.push("A senha não foi informada.");
    }
    if (validations.length > 0) {
        throw new message_validation_error_1.MessageValidationError(validations);
    }
}
//# sourceMappingURL=create-user.js.map