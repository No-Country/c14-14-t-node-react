import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
export const signInWithEmail = (email,password) => {
    try {
      signInWithEmailAndPassword(auth,email,password)
      //Signed In
      const user = userCredential.user
      console.log(user);
    }
    catch (error) {
      const errorCode = error.code
      const errorMessage = error.message

      return {
          ok: false,
          errorMessage,
          errorCode,

      }

  }
}