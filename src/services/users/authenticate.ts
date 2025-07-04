import { authenticateUser } from "../../data/user-api"
import { MessageValidationError } from "../../errors/message-validation.error"
import { AuthenticationRequest } from "./models/authentication.request"
import { AuthenticationResponse } from "./models/authentication.response"

export async function executeAuthentication(authData: AuthenticationRequest) : Promise<AuthenticationResponse | undefined> {
    validateAuthentication(authData)

    return await authenticateUser(authData)
}

function validateAuthentication(authData: AuthenticationRequest) {
    const validations: string[] = []

    if (!authData.usernameOrEmail) {
        validations.push("O e-mail não foi informado.")
    }

    if (!authData.password) {
        validations.push("A senha não foi informada.")
    }

    if (validations.length > 0) {
        throw new MessageValidationError(validations)
    }
}