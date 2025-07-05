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
const express_1 = require("express");
const security_1 = require("../utils/security");
const message_validation_error_1 = require("../errors/message-validation.error");
const create_department_1 = require("../services/departments/create-department");
const router = (0, express_1.Router)();
router.post('/department', security_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, create_department_1.executeCreation)(req.body);
        res.status(201);
        res.json(result);
    }
    catch (error) {
        if (error instanceof message_validation_error_1.MessageValidationError) {
            res.status(error.statusCode).json(error.toJSON());
        }
        res.status(500).json({ error: `Erro ao criar o departamento: ${error}` });
    }
}));
exports.default = router;
//# sourceMappingURL=departments.routes.js.map