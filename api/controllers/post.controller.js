import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
    // Sprawdzenie uprawnień użytkownika
    console.log(req.user)
    if (!req.user.isAdmin) {
        return next(errorHandler(403, "Nie masz uprawnień do utworzenia posta"));
    }

    // Sprawdzenie wymaganych pól
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, "Proszę uzupełnić wszystkie pola"));
    }

    // Tworzenie sluga
    const slug = req.body.title
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '');

    // Tworzenie nowego posta
    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id
    });

    try {
        // Zapis nowego posta
        const savePost = await newPost.save();
        res.status(201).json(savePost);
    } catch (error) {
        // Obsługa błędów zapisu posta
        next(error);
    }
};
