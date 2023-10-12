import "./Registration.css";
import { signInWithFacebook } from "./Login/signInWithFacebook";
import { signInWithGoogle } from "./Login/signInWithGoogle";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase.js';
import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import { FcGoogle } from 'react-icons/fc'
import { BsFacebook } from 'react-icons/bs'
import { AiFillQuestionCircle, AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

const Registration = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [repeatPasswordError, setRepeatPasswordError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [show, setShow] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [emailError, setEmailError] = useState("");

    const switchShow = () => setShow(!show);
    const switchshowRepeatPassword = () => setShowRepeatPassword(!showRepeatPassword);

    const submit = (e) => {
        e.preventDefault();
        if (!validatePassword()) {
            setPasswordError("La contraseña no cumple con los requisitos: 1 mayúscula, 1 minuscula, 1 caracter especial + - ! @, entre 8 y 15 caracteres");
            return;
          }
        if (!validateEmail()) {
            setEmailError("Correo electrónico no válido");
            return;
        }
        if (password !== repeatPassword) {
            setRepeatPasswordError("Las contraseñas no coinciden");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
            navigate("/login")
        })
        //we need to catch the whole sign up process if it fails
        .catch((error) => {
          console.log("Something went wrong with sign up: ", error);
        });
      };

    const validatePassword = () => {
        let validate_password = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!+@-])[A-Za-z!+@-]{1,15}$/;
        return validate_password.test(password);
      };
    const validateEmail = () => {
        const validador_email = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        return validador_email.test(email);
    };


    return (
        <>
        <div className="container-fluid registrationContainer">
                <h1>Registrarme</h1>

                <div className="row registrationLogin p-2">
                    <div className="col-12 pb-1">
                        <button onClick={signInWithGoogle}><FcGoogle />Continuar con Google</button>
                    </div>
                    <div className="col-12">
                        <button onClick={signInWithFacebook}><BsFacebook />Continuar con Facebook</button>
                    </div>
                </div>

                <form method="POST" action="submit">
                    <div className="row registrationEmail p-2">
                        <div className="col">
                            <input  type="email" className="col-12" placeholder="Correo Electrónico" onChange={(e) => setEmail(e.target.value)} required/>
                            {emailError && <p style={{ color: "red" }}>{emailError}</p>}
                        </div>
                    </div>

                    <div className="row registrationNameLastName p-2">
                        <div className="col-6 registrationLastName p-2">
                            <input type="text" className="col-12" placeholder="Apellido" onChange={(e) => setLastName(e.target.value)} required/>
                        </div>
                        <div className="col-6 registrationtName p-2">
                            <input type="text" className="col-12" placeholder="Nombre" onChange={(e) => setName(e.target.value)} required/>
                        </div>
                    </div>
                    
                    <div className="row registrationPassword p-2">
                        <div className="col-11">
                            <input
                                type={show ? "text" : "password"}
                                className="col-11"
                                placeholder="Contraseña"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
                            <button type="button" className="col-1" onClick={switchShow}>
                                {show ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </button>
                        </div>
                        <div className="col-1">
                            <abbr title="1 mayúscula, 1 minúscula, 1 caracter especial + - ! @, entre 8 y 15 caracteres">
                                <AiFillQuestionCircle />
                            </abbr>
                        </div>
                    </div>

                    <div className="row registrationPasswordRepeat p-2">
                        <div className="col-12">
                            <input 
                                type={showRepeatPassword ? "text" : "password"} 
                                className="col-11"
                                placeholder="Repetir Contraseña"
                                onChange={(e) => setRepeatPassword(e.target.value)} 
                                required
                            />
                            <button type="button" className="col-1" onClick={switchshowRepeatPassword}>
                                {showRepeatPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </button>
                            {repeatPasswordError && <p style={{ color: "red" }}>{repeatPasswordError}</p>}
                        </div>
                    </div>
                    
                    <div className="row p-2 registrationSubmitButton">
                        <button type="submit" className="col-12" disabled={password.length < 8} onClick={submit}>Registrarme</button>
                    </div>

                    <div className="row p-2 registrationToLoginButton">
                        <Link to={"/login"}> <h3>Ya estas registrado? </h3><button>Ingresa!</button></Link>
                    </div>
                </form>
        </div>
        </>
    )
}
export default Registration;