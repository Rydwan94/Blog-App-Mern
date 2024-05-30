import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('MongoDB Connection Succeeded.');
}).catch(error => {
    console.log('Error in DB connection: ' + error);
});

const app = express();

// Konfiguracja CORS
app.use(cors({
    origin: 'http://localhost:3000', // Zastąp adresem swojego klienta, jeśli jest inny
    credentials: true // Umożliwia przesyłanie ciasteczek
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

// Middleware handling errors
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000!!');
});
