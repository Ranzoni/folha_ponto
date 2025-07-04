import jwt from 'jsonwebtoken'
import { config } from '../../utils/config';

interface UserPayload {
    id: string
    email: string
}

export function generateToken(id: string, email: string): string {

    const payload: UserPayload = {
        id: id,
        email: email
    }
    const secretKey: string | undefined = config.secretKey
    if (!secretKey)
        throw new Error('A chave secreta não está definida no arquivo de configuração.')

    return jwt.sign(payload, secretKey, { expiresIn: '1h' })
}