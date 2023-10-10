import { signInWithFacebook } from "./Login/signInWithFacebook";
import { signInWithGoogle } from "./Login/signInWithGoogle";

const Login = () => {
    return (
        <>
        <div className="containerLogin">
       <button onClick={signInWithGoogle}>Iniciar Sesion con Google</button>
       <button onClick={signInWithFacebook}>Iniciar Sesion con Facebook</button>
        </div>
        </>
    )
}

export default Login;