"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestValidationError = void 0;
class BadRequestValidationError extends Error {
    constructor(errors) {
        super("Bad Request Validation Error");
        this.statusCode = 400;
        this.errors = errors;
        Object.setPrototypeOf(this, BadRequestValidationError.prototype);
    }
}
exports.BadRequestValidationError = BadRequestValidationError;
//# sourceMappingURL=badrequest-validation.error.js.map