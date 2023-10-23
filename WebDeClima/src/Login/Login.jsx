import  SignInWithGoogle from "./SignInWithGoogle";
import { signInWithFacebook } from "./signInWithFacebook";
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from 'react-icons/bs'
import { FaUserAlt } from 'react-icons/fa'
import { RiLockPasswordFill } from 'react-icons/ri'
import {useNavigate} from "react-router-dom";
import { SignInWithEmail } from "./signInWithEmail";
import { useState } from "react";

const Login = () => {
    const navigate = useNavigate();
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [show, setShow] = useState(false);
    const switchShow = () => setShow(!show);


    const  [user, setUser] = useState({
        userEmail: "",
        userPassword: ""
    })

    const {userEmail,userPassword} = user

    const handleChange = (event) => {
            const { name, value } = event.target;
            setUser({
                ...user,
                [name]: value
            })
        }

    const handleSubmit = (event) => {
        event.preventDefault()
        SignInWithEmail(userEmail,userPassword, navigate)
        console.log(FormData,user);
    }

    return (
        <div className="container-fluid loginContainer mt-3">
            <h3 className="title pb-4">Iniciar Sesión</h3>
            <div className="row registrationLogin mb-3">
                <div className="col-12 m-0 pb-2">
                    <button className="btn google col-12 border border-secondary shadow buttonHover" onClick={() => SignInWithGoogle(navigate)}>
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
                <div className="circle"></div>
                <div className="line"></div>
            </div>
            <form action="" className=" login-buttons-container" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="form-floating mb-3">
                    {/* <FaUserAlt style={{ background: "none", marginRight: "7px" }} /> */}
                        <input type="email" 
                            placeholder="correo electronico"
                            className="form-control"
                            name="userEmail"
                            value={userEmail}
                            onChange={handleChange}
                            required />
                        <label htmlFor="floatingInput" className="ms-3 text-secondary">Correo Electrónico</label>
                    </div>
                </div>
                <div className="row registrationPassword">
                    <div className="col mb-3 me-0 registrationPassword">
                        <div className="form-floating">
                            <input
                                type={show ? "text" : "password"}
                                className="form-control me-0 col-8"
                                placeholder="Contraseña"
                                maxLength="15"
                                name="userPassword"
                                value={userPassword}
                                onChange={handleChange}
                                required
                            ></input>
                            <label htmlFor="floatingInput" className="ms-3 text-secondary col-8">Contraseña</label>
                            <button type="button" className="btn ms-0 col-1" onClick={switchShow}>
                                {show ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row p-2 loginSubmitButton">
                    <button type="submit" className="btn col-12 btn-outline-dark shadow-lg buttonHover">Inciar sesión</button>
                </div>
            </form>
        </div>
    )
}

export default Login;