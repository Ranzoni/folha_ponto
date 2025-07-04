"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageValidationError = void 0;
exports.default = getValidationsFromError;
class MessageValidationError extends Error {
    constructor(validations, statusCode = 422) {
        super("Validations");
        this.name = "MessageValidationError";
        this.validations = validations;
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, MessageValidationError.prototype);
    }
    toJSON() {
        return {
            validations: this.validations
        };
    }
}
exports.MessageValidationError = MessageValidationError;
function getValidationsFromError(data) {
    const validations = [];
    data.forEach((element) => {
        validations.push(element.message);
    });
    return validations;
}
//# sourceMappingURL=message-validation.error.js.map