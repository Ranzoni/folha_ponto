import { Pool } from 'pg'
import { config } from '../../utils/config'

const pool = new Pool({
  user: config.dbUser,
  host: config.dbHost,
  database: config.dbName,
  password: config.dbPassword,
  ssl: {
    rejectUnauthorized: config.dbSsl,
  },
})

async function verifyConnection(): Promise<void> {
  try {
    const client = await pool.connect()
    console.log('Conectado ao banco de dados')
    client.release()
  } catch (error) {
    console.error(`Falha ao tentar se conectar ao banco de dados: ${error}`)
  }
}

verifyConnection()

export default pool