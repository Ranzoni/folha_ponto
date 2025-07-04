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
const send_email_1 = require("../utils/send-email");
const token_generator_1 = require("../utils/token-generator");
function executeCreation(token, newUser, confirmationLink) {
    return __awaiter(this, void 0, void 0, function* () {
        validateCreation(newUser);
        const userCreated = yield (0, user_api_1.createUser)(token, newUser);
        if (!userCreated) {
            return undefined;
        }
        (0, send_email_1.sendEmail)(userCreated.email, "Cadastro realizado com sucesso", emailMessage(userCreated, confirmationLink));
        return userCreated;
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
function emailMessage(user, confirmationLink) {
    return `
        <!DOCTYPE html>
        <html>
            <body>
                <div class='email-container' style='width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1); padding: 20px; border-radius: 8px;'>
                    <div style='text-align: center; padding: 10px 0;'>
                        <h1 style='color: #333333;'>Olá, ${user.name}.</h1>
                    </div>

                    <div style='text-align: center; padding: 20px 0;'>
                        <p>Para confirmar o seu cadastro clique no link abaixo:</p>

                        <a href='${confirmationLink}?token=${(0, token_generator_1.generateToken)(user.id, user.email)}'>
                            Clique aqui!
                        </a>
                    </div>

                    <div style='text-align: center; margin-top: 30px; font-size: 12px; color: #999999'>
                        <p>© 2025 Autenticação em Dois Fatores. Todos os direitos reservados.</p>
                    </div>
                </div>
            </body>
        </html>
    `;
}
//# sourceMappingURL=create-user.js.map