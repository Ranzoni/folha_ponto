import { NextFunction, Request, Response } from "express"

export const verifyToken = (req: Request, res: Response, next: NextFunction): void | Promise<void> => {
    const authHeader = req.headers['authorization']
    if (!authHeader) {
        res.status(401).json({ message: 'O token não foi encontrado.' })
        return
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
        res.status(401).json({ message: 'O token é inválido.' })
        return
    }

    try {
        next()
    } catch (error) {
        res.status(403).json({ message: 'Falha ao validar o token.' })
    }
}

export function getToken(req: Request): string {
    const authHeader = req.headers['authorization']
    if (!authHeader) {
        return ''
    }

    const token = authHeader.split(' ')[1]
    return token || ''
}

export function getUriApi(req: Request): string {
    return `${req.protocol}://${req.get('host')}${req.originalUrl}`
}