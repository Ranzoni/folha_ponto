"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Position = void 0;
const message_validation_error_1 = require("../../../errors/message-validation.error");
const base_class_1 = require("../../utils/base-class");
class Position extends base_class_1.BaseClass {
    constructor(name, id = 0) {
        super(id);
        this.name = name;
        this.validateData();
    }
    get nameValue() {
        return this.name;
    }
    validateData() {
        const validations = [];
        if (!this.name) {
            validations.push('O nome do cargo não foi informado.');
        }
        if (this.name.length < 2 || this.name.length > 100) {
            validations.push('O nome do cargo deve conter de 2 a 100 caracteres');
        }
        if (validations.length > 0)
            throw new message_validation_error_1.MessageValidationError(validations);
    }
}
exports.Position = Position;
//# sourceMappingURL=position.js.map