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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveDepartment = saveDepartment;
exports.getDepartmentByName = getDepartmentByName;
const department_1 = require("../../services/departments/models/department");
const pg_pool_1 = __importDefault(require("../database/pg.pool"));
function saveDepartment(department) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `
        INSERT INTO departments (name)
        VALUES ($1)
        RETURNING id
    `;
        const values = [department.nameValue];
        try {
            const result = yield pg_pool_1.default.query(query, values);
            return new department_1.Department(department.nameValue, result.rows[0].id);
        }
        catch (error) {
            throw Error(`Falha ao tentar inserir um departamento no banco de dados: ${error}`);
        }
    });
}
function getDepartmentByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `
        SELECT id,
            name
        FROM departments
        WHERE LOWER(name) LIKE LOWER($1)
        LIMIT 1
    `;
        const values = [name];
        try {
            const result = yield pg_pool_1.default.query(query, values);
            if (result.rows.length === 0) {
                return undefined;
            }
            return new department_1.Department(result.rows[0].name, result.rows[0].id);
        }
        catch (error) {
            throw Error(`Falha ao tentar recuperar o departamento no banco de dados: ${error}`);
        }
    });
}
//# sourceMappingURL=department-repository.js.map