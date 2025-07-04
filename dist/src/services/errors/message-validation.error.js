"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageValidationError = void 0;
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
