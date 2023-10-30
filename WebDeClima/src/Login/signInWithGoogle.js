import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth }  from '../firebaseConfig/firebase'
import {doc,setDoc} from 'firebase/firestore'
import { db } from "../firebaseConfig/firebase";

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async(navigate) => {

    try {
        const result = await signInWithPopup(auth, googleProvider);
        const credential = GoogleAuthProvider.credentialFromResult(result)
       // console.log({ credential });
       const user = result.user

       setDoc(doc(db, "Clientes", user.uid), {
        Nombre: user.displayName,
        Email: user.email
      })
       
       navigate("/home");
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

export default signInWithGoogle;