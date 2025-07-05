import { getDepartmentByName, saveDepartment } from "../../data/repos/department-repository"
import { MessageValidationError } from "../../errors/message-validation.error"
import { CreateDepartmentRequest } from "./models/create-department.request"
import { Department } from "./models/department"
import { DepartmentResponse } from "./models/department.response"

export async function executeCreation(newDepartment: CreateDepartmentRequest): Promise<DepartmentResponse | undefined> {
    await validateCreation(newDepartment)

    const department = new Department(newDepartment.name)
    const departmentCreated = await saveDepartment(department)
    if (!departmentCreated) {
        throw new Error('Não foi possível recuperar o departamento criado.')
    }

    const departmentResponse: DepartmentResponse | undefined = {
        id: departmentCreated.idValue,
        name: departmentCreated.nameValue
    }
    return departmentResponse
}

async function validateCreation(newDepartment: CreateDepartmentRequest): Promise<void> {
    const validations: string[] = []

    if (!newDepartment) {
        validations.push('O departamento não foi informado.')
    }

    if (!newDepartment.name) {
        validations.push('O nome do departamento não foi informado.')
    }

    if (newDepartment.name.length < 2 || newDepartment.name.length > 100) {
        validations.push('O nome do departamento deve conter de 2 a 100 caracteres')
    }

    const departmentAlreadyRegistered = await getDepartmentByName(newDepartment.name)
    if (!!departmentAlreadyRegistered) {
        validations.push('Já existe um departamento cadastrado com este nome.')
    }

    if (validations.length > 0) {
        throw new MessageValidationError(validations)
    }
}