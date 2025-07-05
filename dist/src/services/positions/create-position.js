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
exports.executeCreation = executeCreation;
const position_repository_1 = require("../../data/repos/position-repository");
const message_validation_error_1 = require("../../errors/message-validation.error");
function executeCreation(newPosition) {
    return __awaiter(this, void 0, void 0, function* () {
        yield validateCreation(newPosition);
        return yield (0, position_repository_1.savePosition)(newPosition);
    });
}
function validateCreation(newPosition) {
    return __awaiter(this, void 0, void 0, function* () {
        const validations = [];
        if (!newPosition) {
            validations.push('O cargo não foi informado.');
        }
        if (!newPosition.name) {
            validations.push('O nome do cargo não foi informado.');
        }
        if (newPosition.name.length < 2 || newPosition.name.length > 100) {
            validations.push('O nome do cargo deve conter de 2 a 100 caracteres');
        }
        const positionAlreadyRegistered = yield (0, position_repository_1.getPositionByName)(newPosition.name);
        if (!!positionAlreadyRegistered) {
            validations.push('Já existe um cargo cadastrado com este nome.');
        }
        if (validations.length > 0) {
            throw new message_validation_error_1.MessageValidationError(validations);
        }
    });
}
//# sourceMappingURL=create-position.js.map