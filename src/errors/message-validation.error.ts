export class MessageValidationError extends Error {
    public readonly statusCode: number
    public readonly validations: string[]

    constructor(validations: string[], statusCode: number = 422) {
        super("Validations")
        this.name = "MessageValidationError"
        this.validations = validations
        this.statusCode = statusCode
        Object.setPrototypeOf(this, MessageValidationError.prototype)
    }

    public toJSON() {
        return {
            validations: this.validations
        }
    }
}

export default function getValidationsFromError(data: any): string[] {
    const validations: string[] = []
    data.forEach((element: any) => {
        validations.push(element.message)
    })

    return validations
}