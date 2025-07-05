"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const message_validation_error_1 = require("../../../errors/message-validation.error");
const base_class_1 = require("../../utils/base-class");
class Employee extends base_class_1.BaseClass {
    constructor(name, position, department, id = 0) {
        super(id);
        this.name = name;
        this.position = position;
        this.department = department;
        this.validateData();
    }
    get positionId() {
        return this.position.idValue;
    }
    get departmentId() {
        return this.department.idValue;
    }
    validateData() {
        const validations = [];
        if (!this.name)
            validations.push('O nome do funcionário não foi informado.');
        if (this.name.length < 3 || this.name.length > 100)
            validations.push('O nome do funcionário deve conter de 3 a 100 caracteres');
        if (validations.length > 0)
            throw new message_validation_error_1.MessageValidationError(validations);
    }
}
exports.Employee = Employee;
//# sourceMappingURL=employee.js.map