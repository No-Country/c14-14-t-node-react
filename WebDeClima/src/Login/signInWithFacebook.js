import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../firebaseConfig/firebase'
const facebookProvider = new FacebookAuthProvider();

export const signInWithFacebook = async () => {
    try {
        const result = await signInWithPopup(auth, facebookProvider);
        const credential = FacebookAuthProvider.credentialFromResult(result)
 //     console.log({ credential });
        const accessToken = credential.accessToken;
        const user = result.user
        return {
         ok: true,
         user,
 
        }
    }
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        
       
        
        const credential = FacebookAuthProvider.credentialFromError(error);
       //console.log({credential});
       return {
        ok: false,
        errorMessage,
        errorCode
       }
    }
}