import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
    // Pobieranie tokena z ciasteczek
    const token = req.cookies.access_token;

    // Debugowanie: Wyświetlenie tokena w konsoli
    console.log("Token:", token);

    // Sprawdzenie, czy token istnieje
    if (!token) {
        return next(errorHandler(401, 'Unauthorized: No token provided'));
    }

    // Weryfikacja tokena
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(errorHandler(401, 'Unauthorized: Invalid token'));
        }

        // Przypisanie użytkownika do req
        req.user = user;

        // Przekazanie sterowania do następnego middleware
        next();
    });
};
