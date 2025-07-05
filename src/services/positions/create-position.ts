import { getPositionByName, savePosition } from "../../data/repos/position-repository"
import { MessageValidationError } from "../../errors/message-validation.error"
import { CreatePositionRequest } from "./models/create-position.request"
import { PositionResponse } from "./models/position.response"

export async function executeCreation(newPosition: CreatePositionRequest): Promise<PositionResponse | undefined> {
    await validateCreation(newPosition)

    return await savePosition(newPosition)
}

async function validateCreation(newPosition: CreatePositionRequest): Promise<void> {
    const validations: string[] = []

    if (!newPosition) {
        validations.push('O cargo não foi informado.')
    }

    if (!newPosition.name) {
        validations.push('O nome do cargo não foi informado.')
    }

    if (newPosition.name.length < 2 || newPosition.name.length > 100) {
        validations.push('O nome do cargo deve conter de 2 a 100 caracteres')
    }

    const positionAlreadyRegistered = await getPositionByName(newPosition.name)
    if (!!positionAlreadyRegistered) {
        validations.push('Já existe um cargo cadastrado com este nome.')
    }

    if (validations.length > 0) {
        throw new MessageValidationError(validations)
    }
}