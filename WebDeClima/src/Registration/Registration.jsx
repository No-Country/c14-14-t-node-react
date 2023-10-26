import "./Registration.css";
import SignInWithGoogle  from "../Login/SignInWithGoogle";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig/firebase.js';
import {useNavigate} from "react-router-dom";
import { useState, useContext } from "react";
import { FcGoogle } from 'react-icons/fc'
import { BsFacebook } from 'react-icons/bs'
import { AiFillQuestionCircle, AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import {UserContext} from "../context/userContext"
import { db } from "../firebaseConfig/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

const Registration = () => {
    const {signedUser} = useContext(UserContext);
    const clientsCollection = collection(db, "Clientes");

    const navigate = useNavigate();
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    const [passwordError, setPasswordError] = useState("");
    const [show, setShow] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [repeatPasswordError, setRepeatPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [userNameError, setUserNameError] = useState("");
    const [userLastNameError, setUserLastNameError] = useState("");
    const [userNumberError, setUserNumberError] = useState("");
    const [newUser, setNewUser] = useState({
        userName: "",
        userLastName: "",
        userEmail: "",
        userNumber: "",
        userPassword: "",
        userRepeatPassword: ""
    })
    const { userName, userLastName, userEmail, userNumber, userPassword, userRepeatPassword } = newUser
    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewUser({
            ...newUser,
            [name]: value
        })

    }

    const switchShow = () => setShow(!show);
    const switchshowRepeatPassword = () => setShowRepeatPassword(!showRepeatPassword);

    const submit = (e) => {
        e.preventDefault();
        if (!validatePassword()) {
            setPasswordError("Contraseña inválida. Requisitos: 8 a 15 caracteres, incluir 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial (+ - ! @)");
            return;
          } else {
            setPasswordError(""); // Limpia el mensaje de error si el campo es válido.
        }
        if (!validateEmail()) {
            setEmailError("Correo electrónico inválido");
            return;
        } else {
            setEmailError(""); // Limpia el mensaje de error si el campo es válido.
        }
        if (!userNumber || userNumber.length < 10) {
            setUserNumberError("El número es inválido");
            return;
        } else {
            setUserNumberError(""); // Limpia el mensaje de error si el campo es válido.
        }
    
        if (!userLastName) {
            setUserLastNameError("El apellido es requerido");
            return;
        } else {
            setUserLastNameError(""); // Limpia el mensaje de error si el campo es válido.
        }
        if (!userName) {
            setUserNameError("El nombre es requerido");
            return;
        } else {
            setUserNameError(""); // Limpia el mensaje de error si el campo es válido.
        }
    
        if (userPassword !== userRepeatPassword) {
            setRepeatPasswordError("Las contraseñas no coinciden");
            return;
        } else {
            setRepeatPasswordError(""); // Limpia el mensaje de error si el campo es válido.
        }

        createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            setDoc(doc(db, "Clientes", user.uid), {
              Nombre: userName,
              Apellido: userLastName,
              Email: userEmail,
              Telefono: userNumber,
              Contraseña: userPassword,
            })
              //ensure we catch any errors at this stage to advise us if something does go wrong
              .catch((error) => {
                console.log("Something went wrong with sign up: ", error);
                alert(`¡Email inválido! Es posible que ya exista una cuenta asociada a este correo electrónico. Por favor, revisa tus datos`);
              });
            navigate("/home");
          })
        console.log(newUser);
    };

    



    const validatePassword = () => {
        let validate_password = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!+@-])(?=.*\d).{8,15}$/;
        return validate_password.test(userPassword);
      };
    const validateEmail = () => {
        const validador_email = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        return validador_email.test(userEmail);
    };


    return (
        <>
        <div className="container-fluid registrationContainer mt-3">
                <h2 className="title pb-4">Registrarme</h2>

                <div className="row registrationLogin mb-3">
                    <div className="col-12 m-0 pb-2">
                        <button className="btn border-0 google col-12 border border-secondary shadow buttonHover" onClick={() => SignInWithGoogle(navigate)}>

                            <div className="d-flex align-items-center justify-content-center">
                                <div className="googleIcon pb-1 pe-1">
                                    <FcGoogle />
                                </div>
                                <div className="googleText ">
                                    Continuar con Google
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="lines-container">
                    <div className="line"></div>
                    <div className="circle mb-3">O</div>
                    <div className="line"></div>
                </div>

                <form method="POST" action="submit">
                    <div className="row registrationNameLastName">
                        <div className="form-floating mb-3">
                            <input type="email" 
                                className="form-control custom-opacity-bg shadow-lg"  
                                name="userEmail"
                                value={userEmail}
                                placeholder="Correo Electrónico"
                                onChange={handleChange}
                                required />
                            <label htmlFor="floatingInput" className="inputLabelEmail ms-3 text-secondary">Correo Electrónico</label>
                            {emailError && <p style={{ color: "red" }}>{emailError}</p>}
                        </div>
                    </div>
                    <div className="row registrationNameLastName">
                        <div className="form-floating mb-3 col-6 registrationtName">
                            <input type="text" 
                                className="form-control custom-opacity-bg shadow-lg col-12" 
                                placeholder="Nombre"
                                name="userName"
                                value={userName}
                                onChange={handleChange}
                                required/>
                            <label htmlFor="floatingInput" className="ms-3 text-secondary">Nombre</label>
                            {userNameError && <p style={{ color: "red" }}>{userNameError}</p>}
                        </div>
                        <div className="form-floating mb-3 col-6 registrationLastName">
                            <input type="text" 
                                className="form-control custom-opacity-bg shadow-lg col-12" 
                                placeholder="Apellido"
                                name="userLastName"
                                value={userLastName}
                                onChange={handleChange}
                                required/>
                            <label htmlFor="floatingInput" className="ms-3 text-secondary">Apellido</label>
                            {userLastNameError && <p style={{ color: "red" }}>{userLastNameError}</p>}
                        </div>
                    </div>

                    <div className="row registrationNumber">
                        <div className="form-floating mb-3 col-12 registrationNumber">
                            <input type="tel" 
                                className="form-control custom-opacity-bg shadow-lg" 
                                placeholder="Teléfono"  
                                maxLength="15" 
                                name="userNumber"
                                value={userNumber}
                                onChange={handleChange} 
                                required/>
                            <label htmlFor="floatingInput" className="ms-3 text-secondary">Teléfono: 11 12345678</label>
                            {userNumberError && <p style={{ color: "red" }}>{userNumberError}</p>}
                        </div>
                    </div>

                    
                    <div className="row registrationPassword">
                        <div className="form-floating">
                            <input
                                type={show ? "text" : "password"}
                                className="form-control custom-opacity-bg shadow-lg"
                                placeholder="Contraseña"
                                maxLength="15"
                                name="userPassword"
                                value={userPassword}
                                onChange={handleChange}
                                required
                            ></input>
                            <label htmlFor="floatingInput" className="ms-3 text-secondary">Contraseña</label>
                            <button type="button" className="btn ms-0 col-1" onClick={switchShow}>
                                {show ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </button>
                            <button type="button" className="btn col-1"
                                data-bs-toggle="tooltip" data-bs-placement="right"
                                data-bs-title="La contraseña debe tener entre 8 y 15 caracteres e incluir 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial (+ - ! @)">
                                <AiFillQuestionCircle />
                            </button>
                            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
                        </div>
                    </div>

                    <div className="row registrationPasswordRepeat">
                        <div className="form-floating mb-3 col">
                            <input 
                                type={showRepeatPassword ? "text" : "password"} 
                                className="form-control custom-opacity-bg shadow-lg col-11"
                                placeholder="Repetir Contraseña"
                                maxLength="15"
                                name="userRepeatPassword"
                                value={userRepeatPassword}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="floatingInput" className="ms-3 text-secondary">Repetir Contraseña</label>

                            <button type="button" className="btn ms-0 col-1" onClick={switchshowRepeatPassword}>
                                {showRepeatPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </button>
                            {repeatPasswordError && <p style={{ color: "red" }}>{repeatPasswordError}</p>}
                        </div>
                    </div>
                    
                    <div className="row p-2 registrationSubmitButton">
                        <button type="submit" className="btn border-0 rounded col-12 shadow-lg rounded-pill border-0 buttonHover" disabled={userPassword.length < 8} onClick={submit}>Registrarme</button>
                    </div>
                </form>
        </div>
        </>
    )
}
export default Registration;