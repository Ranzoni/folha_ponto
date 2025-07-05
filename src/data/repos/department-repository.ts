import { Department } from "../../services/departments/models/department"
import pool from "../database/pg.pool"

export async function saveDepartment(department: Department): Promise<Department | undefined> {
    const query = `
        INSERT INTO departments (name)
        VALUES ($1)
        RETURNING id
    `
    const values = [department.nameValue]

    try {
        const result = await pool.query(query, values)

        return new Department(department.nameValue, result.rows[0].id)
    } catch (error) {
        throw Error(`Falha ao tentar inserir um departamento no banco de dados: ${error}`)
    }
}

export async function getDepartmentByName(name: string): Promise<Department | undefined> {
    const query = `
        SELECT id,
            name
        FROM departments
        WHERE LOWER(name) LIKE LOWER($1)
        LIMIT 1
    `

    const values = [name]

    try {
        const result = await pool.query(query, values)
        if (result.rows.length === 0) {
            return undefined
        }

        return new Department(result.rows[0].name, result.rows[0].id)
    } catch (error) {
        throw Error(`Falha ao tentar recuperar o departamento no banco de dados: ${error}`)
    }
}