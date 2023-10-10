import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth }  from '../firebase'
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const credential = GoogleAuthProvider.credentialFromResult(result)
       // console.log({ credential });
       const user = result.user
       return {
        ok: true,
        user,

       }
    }
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        
        const credential = GoogleAuthProvider.credentialFromError(error);
       // console.log({credential});
       return {
        ok: false,
        errorMessage
       }
    }
}