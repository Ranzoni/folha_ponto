import { savePosition } from "../../data/repos/position-repository";
import { MessageValidationError } from "../../errors/message-validation.error"
import { CreatePositionRequest } from "./models/create-position.request"
import { PositionResponse } from "./models/position.response"

export async function executeCreation(newPosition: CreatePositionRequest): Promise<PositionResponse | undefined> {
    validateCreation(newPosition)

    return await savePosition(newPosition)
}

function validateCreation(newPosition: CreatePositionRequest): void {
    const validations: string[] = []

    if (!newPosition) {
        validations.push('O cargo não foi informado.')
    }

    if (!newPosition.name) {
        validations.push('O nome do cargo não foi informado.')
    }

    if (validations.length > 0) {
        throw new MessageValidationError(validations)
    }
}