import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate} from "react-router-dom";

const auth = getAuth();

export const signInWithEmail = (email,password, navigate) => {
  signInWithEmailAndPassword(auth, email, password)
  .then(() => {
      console.log("Ingreso Correcto");
      navigate("/home")
  })
    .catch ((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      alert(`¡Usuario o Contraseña incorrectos! Por favor, revisa tus datos`);
      return {
          ok: false,
          errorMessage,
          errorCode,
      }

  })
}