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
        console.error('Error executing query:', error)
        throw Error(`Falha ao tentar inserir um cargo no banco de dados: ${error}`)
    }
}