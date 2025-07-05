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
const message_validation_error_1 = require("../errors/message-validation.error");
const create_position_1 = require("../services/positions/create-position");
const router = (0, express_1.Router)();
router.post('/position', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, create_position_1.executeCreation)(req.body);
        res.json(response);
    }
    catch (error) {
        if (error instanceof message_validation_error_1.MessageValidationError) {
            res.status(error.statusCode).json(error.toJSON());
        }
        res.status(500).json({ error: `Erro ao criar o cargo: ${error}` });
    }
}));
exports.default = router;
//# sourceMappingURL=positions.routes.js.map