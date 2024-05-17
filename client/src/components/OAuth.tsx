import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import {app} from '../firebase'
import { useAppDispatch } from "../app/hooks";
import { signInSucces } from "../features/user/userSlice";
import { useNavigate } from "react-router";

const OAuth = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

    const auth = getAuth(app)
    const handleGoogleClick = async() => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt: 'select_account'})

        try {
            const resultFromGoogle = await signInWithPopup(auth,provider)
            const res = await fetch('/api/auth/google', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                name: resultFromGoogle.user.displayName,
                email: resultFromGoogle.user.email,
                googlePhotoUrl: resultFromGoogle.user.photoURL
              })
            })

            const data = await res.json()

            if(res.ok){
              dispatch(signInSucces(data))
              navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Button type="button" gradientMonochrome="failure" outline onClick={handleGoogleClick}>
      <AiFillGoogleCircle className="w-6 h-6 mr-2"/>
      Kontynuuj z Google
    </Button>
  );
};

export default OAuth;
