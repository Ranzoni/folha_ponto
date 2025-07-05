"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Department = void 0;
class Department {
    constructor(name, id = 0) {
        this.id = 0;
        this.id = id;
        this.name = name;
    }
    get idValue() {
        return this.id;
    }
    get nameValue() {
        return this.name;
    }
}
exports.Department = Department;
//# sourceMappingURL=department.js.map