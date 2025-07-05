import { MessageValidationError } from "../../../errors/message-validation.error"

export class User {
    private id: string
    private email: string

    public constructor(id: string, email: string) {
        this.id = id
        this.email = email

        this.validateData()
    }
    
    public get idValue() : string {
        return this.id
    }

    public get emailValue() : string {
        return this.email
    }

    private validateData(): void {
        const validations: string[] = []

        if (!this.id)
            validations.push('O ID do usuário não foi informado.')

        if (!this.email)
            validations.push('O e-mail do usuário não foi informado')

        if (validations.length > 0)
            throw new MessageValidationError(validations)
    }
}