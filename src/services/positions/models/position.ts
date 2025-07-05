import { MessageValidationError } from "../../../errors/message-validation.error"
import { BaseClass } from "../../utils/base-class"

export class Position extends BaseClass {
    private name: string
    
    public constructor(name: string, id: number = 0){
        super(id)
        this.name = name

        this.validateData()
    }

    public get nameValue() : string {
        return this.name
    }
    
    protected validateData(): void {
        const validations: string[] = []
        if (!this.name) {
            validations.push('O nome do cargo não foi informado.')
        }
    
        if (this.name.length < 2 || this.name.length > 100) {
            validations.push('O nome do cargo deve conter de 2 a 100 caracteres')
        }

        if (validations.length > 0)
            throw new MessageValidationError(validations)
    }
}