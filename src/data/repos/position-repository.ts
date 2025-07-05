import { CreatePositionRequest } from "../../services/positions/models/create-position.request"
import { PositionResponse } from "../../services/positions/models/position.response"
import pool from "../database/pg.pool"

export async function savePosition(position: CreatePositionRequest): Promise<PositionResponse | undefined> {
    const query = `
        INSERT INTO positions (name)
        VALUES ($1)
        RETURNING id
    `
    const values = [position.name]

    try {
        const result = await pool.query(query, values)

        const positionCreated: PositionResponse = {
            id: result.rows[0].id,
            name: position.name
        }

        return positionCreated
    } catch (error) {
        throw Error(`Falha ao tentar inserir um cargo no banco de dados: ${error}`)
    }
}

export async function getPositionByName(name: string): Promise<PositionResponse | undefined> {
    const query = `
        SELECT id,
            name
        FROM positions
        WHERE LOWER(name) LIKE LOWER($1)
        LIMIT 1
    `
    const values = [name]

    try {
        const result = await pool.query(query, values)
        if (result.rows.length === 0) {
            return undefined
        }

        const positionCreated: PositionResponse = {
            id: result.rows[0].id,
            name: result.rows[0].name
        }

        return positionCreated
    } catch (error) {
        throw Error(`Falha ao tentar recuperar um cargo no banco de dados: ${error}`)
    }
}