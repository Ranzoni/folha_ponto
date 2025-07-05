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
const position_1 = require("./models/position");
function executeCreation(newPosition) {
    return __awaiter(this, void 0, void 0, function* () {
        yield validateCreation(newPosition);
        const position = new position_1.Position(newPosition.name);
        const positionCreated = yield (0, position_repository_1.savePosition)(position);
        if (!positionCreated)
            throw new Error('Não foi possível recuperar o cargo criado.');
        const positionResponse = {
            id: positionCreated.idValue,
            name: positionCreated.nameValue
        };
        return positionResponse;
    });
}
function validateCreation(newPosition) {
    return __awaiter(this, void 0, void 0, function* () {
        const validations = [];
        if (!newPosition)
            validations.push('O cargo não foi informado.');
        const positionAlreadyRegistered = yield (0, position_repository_1.getPositionByName)(newPosition.name);
        if (!!positionAlreadyRegistered)
            validations.push('Já existe um cargo cadastrado com este nome.');
        if (validations.length > 0)
            throw new message_validation_error_1.MessageValidationError(validations);
    });
}
//# sourceMappingURL=create-position.js.map