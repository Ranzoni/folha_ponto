import express from 'express'
import usersRoutes from './src/routes/users.routes'

const app = express()

app.get('/api', usersRoutes)

app.listen(3000, () => {
    console.log('Running!')
})