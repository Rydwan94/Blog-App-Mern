import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";

export const user = (req, res) => {
  res.json({ message: "API is working" });
};

export const updateUser = async (req, res, next) => {
  try {
    // sprawdzenie zgodność id
    if (req.user.id !== req.params.userId) {
      return next(errorHandler(403, "Nie masz uprawnień do aktualizowania tego użytkownika"));
    }

    // walidacja hasla
    if (req.body.password) {
      if (req.body.password.length < 6) {
        return next(errorHandler(400, "Hasło musi mieć co najmniej 6 znaków"));
      }
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    // walidacj nazwy uzytkownika
    if (req.body.username) {
      if (req.body.username.length < 7 || req.body.username.length > 20) {
        return next(errorHandler(400, "Nazwa użytkownika powinna zawierać od 7 do 20 znaków"));
      }

      if (req.body.username.includes(" ")) {
        return next(errorHandler(400, "Nazwa użytkownika nie może zawierać białych znaków"));
      }

      if (req.body.username !== req.body.username.toLowerCase()) {
        return next(errorHandler(400, "Nazwa użytkownika nie może zawierać dużych znaków"));
      }

      if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
        return next(errorHandler(400, "Nazwa użytkownika może się składać tylko z liter oraz cyfr"));
      }
    }

    // obiekt z zaktualizowanymi danym
    const updateFields = {};
    if (req.body.username) updateFields.username = req.body.username;
    if (req.body.email) updateFields.email = req.body.email;
    if (req.body.profilePicture) updateFields.profilePicture = req.body.profilePicture;
    if (req.body.password) updateFields.password = req.body.password;

    // aktualizacja uzytkownika
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, { $set: updateFields }, { new: true });
    if (!updatedUser) {
      return next(errorHandler(404, "Użytkownik nie znaleziony"));
    }

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);

  } catch (error) {
    next(errorHandler(500, "Wystąpił błąd podczas aktualizacji użytkownika"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, "Nie można usunąć tego użytkownika"));
  }

  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);

    if (!deletedUser) {
      return next(errorHandler(404, "Użytkownik nie znaleziony"));
    }

    res.status(200).json("Użytkownik został pomyślnie usunięty");
  } catch (error) {
    next(errorHandler(500, "Wystąpił błąd podczas usuwania użytkownika"));
  }
};


export const signout = async (req,res,next) => {
  try {
    res.clearCookie('access_token').status(200).json('Użytkownik został wylogowany')
  } catch (error) {
    next(err)
  }
}

export const getUsers = async (req, res, next) => {
  if(!req.user.isAdmin){
    return next(errorHandler(403, 'You are not allowed to se all users'))
  }

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort || 'asc'

    const users = await User.find()
    .sort({ createdAt: sortDirection === 'asc' ? 1 : -1 })
    .skip(startIndex)
    .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const {password, ...rest} = user._doc
      return rest
    })

    const totalUsers = await User.countDocuments()

    const now = new Date()

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    )

    const lastMonthUsers = await User.countDocuments({
      createdAt: {$gte: oneMonthAgo}
    })


    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers
    })
  } catch (error) {
    next(error)
  }
}