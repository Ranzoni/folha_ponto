import { createUser } from "../../data/user-api"
import { MessageValidationError } from "../../errors/message-validation.error"
import { sendEmail } from "../utils/send-email"
import { generateToken } from "../utils/token-generator"
import { CreateUserRequest } from "./models/create-user.request"
import { UserResponse } from "./models/user.response"

export default async function executeCreation(token: string, newUser: CreateUserRequest, confirmationLink: string): Promise<UserResponse | undefined> {
    validateCreation(newUser)

    const userCreated = await createUser(token, newUser)
    if (!userCreated) {
        return undefined
    }

    sendEmail(userCreated!.email, "Cadastro realizado com sucesso", emailMessage(userCreated, confirmationLink))

    return userCreated
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

function emailMessage(user: UserResponse, confirmationLink: string): string {
    return `
        <!DOCTYPE html>
        <html>
            <body>
                <div class='email-container' style='width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1); padding: 20px; border-radius: 8px;'>
                    <div style='text-align: center; padding: 10px 0;'>
                        <h1 style='color: #333333;'>Olá, ${user.name}.</h1>
                    </div>

                    <div style='text-align: center; padding: 20px 0;'>
                        <p>Para confirmar o seu cadastro clique no link abaixo:</p>

                        <a href='${confirmationLink}?token=${generateToken(user.id, user.email)}'>
                            Clique aqui!
                        </a>
                    </div>

                    <div style='text-align: center; margin-top: 30px; font-size: 12px; color: #999999'>
                        <p>© 2025 Autenticação em Dois Fatores. Todos os direitos reservados.</p>
                    </div>
                </div>
            </body>
        </html>
    `
}