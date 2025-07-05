"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
exports.getToken = getToken;
exports.getUriApi = getUriApi;
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.status(401).json({ validations: ['O token não foi encontrado.'] });
        return;
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ validations: ['O token é inválido.'] });
        return;
    }
    try {
        next();
    }
    catch (error) {
        res.status(403).json({ validations: ['Falha ao validar o token.'] });
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
function getUriApi(req) {
    return `${req.protocol}://${req.get('host')}${req.originalUrl}`;
}
//# sourceMappingURL=security.js.map