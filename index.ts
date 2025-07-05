import express from 'express'
import usersRoutes from './src/routes/users.routes'
import positionsRoutes from './src/routes/positions.routes'
import departmentsRoutes from './src/routes/departments.routes'

const app = express()

app.use(express.json())

app.use('/api', usersRoutes)
app.use('/api', positionsRoutes)
app.use('/api', departmentsRoutes)

app.listen(3000, () => {
    console.log('Running!')
})