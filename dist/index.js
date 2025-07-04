"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_routes_1 = __importDefault(require("./src/routes/users.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', users_routes_1.default);
app.listen(3000, () => {
    console.log('Running!');
});
//# sourceMappingURL=index.js.map