import { createUser } from "../../data/user-api"
import { MessageValidationError } from "../../errors/message-validation.error"
import { CreateUserRequest } from "./models/create-user.request"
import { UserResponse } from "./models/user.response"

export default async function executeCreation(token: string, newUser: CreateUserRequest): Promise<UserResponse | undefined> {
    validateCreation(newUser)

    return await createUser(token, newUser)
}

function validateCreation(newUser: CreateUserRequest): void {
    const validations: string[] = []

    if (!newUser.name) {
        validations.push("O nome não foi informado.")
    }

    if (!newUser.email) {
        validations.push("O e-mail não foi informado.")
    }

    if (!newUser.password) {
        validations.push("A senha não foi informada.")
    }

    if (validations.length > 0) {
        throw new MessageValidationError(validations)
    }
}