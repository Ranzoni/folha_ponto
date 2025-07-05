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
const department_repository_1 = require("../../data/repos/department-repository");
const message_validation_error_1 = require("../../errors/message-validation.error");
const department_1 = require("./models/department");
function executeCreation(newDepartment) {
    return __awaiter(this, void 0, void 0, function* () {
        yield validateCreation(newDepartment);
        const department = new department_1.Department(newDepartment.name);
        const departmentCreated = yield (0, department_repository_1.saveDepartment)(department);
        if (!departmentCreated) {
            throw new Error('Não foi possível recuperar o departamento criado.');
        }
        const departmentResponse = {
            id: departmentCreated.idValue,
            name: departmentCreated.nameValue
        };
        return departmentResponse;
    });
}
function validateCreation(newDepartment) {
    return __awaiter(this, void 0, void 0, function* () {
        const validations = [];
        if (!newDepartment) {
            validations.push('O departamento não foi informado.');
        }
        if (!newDepartment.name) {
            validations.push('O nome do departamento não foi informado.');
        }
        if (newDepartment.name.length < 2 || newDepartment.name.length > 100) {
            validations.push('O nome do departamento deve conter de 2 a 100 caracteres');
        }
        const departmentAlreadyRegistered = yield (0, department_repository_1.getDepartmentByName)(newDepartment.name);
        if (!!departmentAlreadyRegistered) {
            validations.push('Já existe um departamento cadastrado com este nome.');
        }
        if (validations.length > 0) {
            throw new message_validation_error_1.MessageValidationError(validations);
        }
    });
}
//# sourceMappingURL=create-department.js.map