import express from 'express'
import mongoose from 'mongoose'
import { configDotenv } from 'dotenv'
import userRoutes from './routes/user.route.js'

configDotenv();

mongoose.connect(process.env.MONGO)

const app = express()

app.listen(3000, () => {
    console.log('server is running on port 3000!!')
})


app.use('/api/user', userRoutes)