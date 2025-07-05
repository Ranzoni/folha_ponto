import { Position } from "../../services/positions/models/position"
import pool from "../database/pg.pool"

export async function savePosition(position: Position): Promise<Position | undefined> {
    const query = `
        INSERT INTO positions (name)
        VALUES ($1)
        RETURNING id
    `
    const values = [position.nameValue]

    try {
        const result = await pool.query(query, values)

        return new Position(position.nameValue, result.rows[0].id)
    } catch (error) {
        throw Error(`Falha ao tentar inserir um cargo no banco de dados: ${error}`)
    }
}

export async function getPositionByName(name: string): Promise<Position | undefined> {
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
        if (result.rows.length === 0)
            return undefined

        return new Position(result.rows[0].name, result.rows[0].id)
    } catch (error) {
        throw Error(`Falha ao tentar recuperar um cargo no banco de dados: ${error}`)
    }
}