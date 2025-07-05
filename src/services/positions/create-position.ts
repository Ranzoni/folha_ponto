import { getPositionByName, savePosition } from "../../data/repos/position-repository"
import { MessageValidationError } from "../../errors/message-validation.error"
import { CreatePositionRequest } from "./models/create-position.request"
import { Position } from "./models/position"
import { PositionResponse } from "./models/position.response"

export async function executeCreation(newPosition: CreatePositionRequest): Promise<PositionResponse | undefined> {
    await validateCreation(newPosition)

    const position = new Position(newPosition.name)
    const positionCreated = await savePosition(position)
    if (!positionCreated)
        throw new Error('Não foi possível recuperar o cargo criado.')

    const positionResponse: PositionResponse = {
        id: positionCreated.idValue,
        name: positionCreated.nameValue
    }
    return positionResponse
}

async function validateCreation(newPosition: CreatePositionRequest): Promise<void> {
    const validations: string[] = []

    if (!newPosition)
        validations.push('O cargo não foi informado.')

    const positionAlreadyRegistered = await getPositionByName(newPosition.name)
    if (!!positionAlreadyRegistered)
        validations.push('Já existe um cargo cadastrado com este nome.')

    if (validations.length > 0)
        throw new MessageValidationError(validations)
}