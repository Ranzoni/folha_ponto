"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
exports.getToken = getToken;
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.status(401).json({ message: 'O token não foi encontrado.' });
        return;
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'O token é inválido.' });
        return;
    }
    try {
        next();
    }
    catch (error) {
        res.status(403).json({ message: 'Falha ao validar o token.' });
    }
};
exports.verifyToken = verifyToken;
function getToken(req) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return '';
    }
    const token = authHeader.split(' ')[1];
    return token || '';
}
//# sourceMappingURL=security.js.map