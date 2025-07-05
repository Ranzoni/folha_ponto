import { MessageValidationError } from "../../../errors/message-validation.error"
import { Department } from "../../departments/models/department"
import { Position } from "../../positions/models/position"
import { BaseClass } from "../../utils/base-class"

export class Employee extends BaseClass {
    private name: string
    private position: Position
    private department: Department

    public constructor(name: string, position: Position, department: Department, id: number = 0) {
        super(id)
        this.name = name
        this.position = position
        this.department = department

        this.validateData()
    }
    
    public get positionId() : number {
        return this.position.idValue
    }
    
    public get departmentId() : number {
        return this.department.idValue
    }

    protected validateData(): void {
        const validations: string[] = []

        if (!this.name)
            validations.push('O nome do funcionário não foi informado.')

        if (this.name.length < 3 || this.name.length > 100)
            validations.push('O nome do funcionário deve conter de 3 a 100 caracteres')

        if (validations.length > 0)
            throw new MessageValidationError(validations)
    }
}