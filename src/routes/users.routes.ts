import { Router, Request, Response } from "express"
import { AuthenticationRequest } from "../services/users/models/authentication.request"
import { executeAuthentication } from "../services/users/authenticate"
import { MessageValidationError } from "../errors/message-validation.error"
import { getToken, verifyToken } from "../security"
import executeCreation from "../services/users/create-user"
import { CreateUserRequest } from "../services/users/models/create-user.request"

const router = Router()

router.post('/user/authenticate', async (req: Request, res: Response) => {
    try {
        const response = await executeAuthentication(req.body as AuthenticationRequest)
        res.json(response)
    } catch (error: any) {
        if (error instanceof MessageValidationError) {
            res.status(error.statusCode).json(error.toJSON())
        }

        res.status(500).json({ error: `Erro ao autenticar usuário: ${error}` })
    }
})

router.post('/user', verifyToken, async (req: Request, res: Response) => {
    try {
        const response = await executeCreation(getToken(req), req.body as CreateUserRequest)
        res.json(response)
    } catch (error: any) {
        if (error instanceof MessageValidationError) {
            res.status(error.statusCode).json(error.toJSON())
        }

        res.status(500).json({ error: `Erro ao autenticar usuário: ${error}` })
    }
})

export default router