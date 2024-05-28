import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"

export const user = (req,res) => {
    res.json({message: "APi is working"})
}

export const updateUser = async (req,res,next) => {

   if(req.user.id !== req.params.userId ){
    return next(errorHandler(403, 'Nie masz uprawnień do aktualizowania tego użytkownika'))
   }

   if(req.body.password){
    if(req.body.password.length < 6) {
        return next(errorHandler(400, 'Hasło musi mieć co najmniej 6 znaków'))
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10)
   }

   if(req.body.username) {
    if(req.body.username.length < 7 || req.body.username.length > 20) {
        return next(errorHandler(400, 'Nazwa użytkownika powinna zawierać od 7 do 20 znaków'))
    }
   }

   if(req.body.username.includes(' ')) {
    return next(errorHandler(400, 'Nazwa użytkownika nie może zawierać białych znaków'))
   }

   if(req.body.username !== req.body.username.toLowerCase() ){
    return next(errorHandler(400, 'Nazwa użytkownika nie może zawierać dużych znaków'))
   }

   if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
    return (next(errorHandler(400, 'Nazwa użytkownika może się składać tylko z liter oraz cyfr')))
   }

   try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
        $set: {
            username: req.body.username,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
            password: req.body.password
        },
    }, {new: true});
    const {password, ...rest} = updatedUser._doc;
    res.status(200).json(rest)
   } catch (error) {
        next(error)
   }
}


export const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'Nie można usunąć tego użytkownika'))
    }

    try {
        await User.findByIdAndDelete(req.params.userId)
        res.status(200).json('Użytkownik został pomyślnie usunięty')
    } catch (error) {
        next(error)
    }
}