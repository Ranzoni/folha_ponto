import { Request, Response, Router } from "express"
import { MessageValidationError } from "../errors/message-validation.error"
import { executeCreation } from "../services/positions/create-position"
import { CreatePositionRequest } from "../services/positions/models/create-position.request"
import { verifyToken } from "../utils/security"

const router = Router()

router.post('/position', verifyToken, async (req: Request, res: Response) => {
    try {
        const response = await executeCreation(req.body as CreatePositionRequest)
        res.status(201)
        res.json(response)
    } catch (error) {
        if (error instanceof MessageValidationError) {
            res.status(error.statusCode).json(error.toJSON())
        }

        res.status(500).json({ error: `Erro ao criar o cargo: ${error}` })
    }
})

export default router