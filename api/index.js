import express from 'express'
import mongoose from 'mongoose'
import { configDotenv } from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

configDotenv();

mongoose.connect(process.env.MONGO).then(() =>{
    console.log('MongoDB Connection Succeeded.')
}).catch(error=>{
    console.log('Error in DB connection: ' + error)
});

const app = express()

app.use(express.json());

app.listen(3000, () => {
    console.log('server is running on port 3000!!')
})


app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

