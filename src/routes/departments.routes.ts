import { Request, Response, Router } from "express"
import { verifyToken } from "../utils/security"
import { MessageValidationError } from "../errors/message-validation.error"
import { executeCreation } from "../services/departments/create-department"
import { CreateDepartmentRequest } from "../services/departments/models/create-department.request"

const router = Router()

router.post('/department', verifyToken, async (req: Request, res: Response) => {
    try {
        const result = await executeCreation(req.body as CreateDepartmentRequest)
        res.status(201)
        res.json(result)
    } catch (error) {
        if (error instanceof MessageValidationError) {
            res.status(error.statusCode).json(error.toJSON())
        }

        res.status(500).json({ error: `Erro ao criar o departamento: ${error}` })
    }
})

export default router