import  signInWithGoogle from "./signInWithGoogle";
import { signInWithFacebook } from "./signInWithFacebook";
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from 'react-icons/bs'
import { FaUserAlt } from 'react-icons/fa'
import { RiLockPasswordFill } from 'react-icons/ri'
import {useNavigate} from "react-router-dom";
import { signInWithEmail } from "./signInWithEmail";
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
        signInWithEmail(userEmail,userPassword, navigate)
        console.log(FormData,user);
    }

    return (
        <div className="container-fluid loginContainer mt-3">
            <h3 className="title pb-4">Iniciar Sesión</h3>
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
                <div className="circlemb-3">O</div>
                <div className="line"></div>
            </div>
            <form action="" className=" login-buttons-container" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col mb-3 me-0">
                        <div className="form-floating">
                        {/* <FaUserAlt style={{ background: "none", marginRight: "7px" }} /> */}
                            <input type="email" 
                                placeholder="correo electronico"
                                className="form-control custom-opacity-bg shadow-lg"
                                name="userEmail"
                                value={userEmail}
                                onChange={handleChange}
                                required />
                            <label htmlFor="floatingInput" className="ms-3 text-secondary">Correo Electrónico</label>
                        </div>
                        <div id="passwordError" style={{ color: 'red' }}></div>
                    </div>
                </div>
                <div className="row registrationPassword">
                    <div className="col mb-3 me-0 registrationPassword">
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
                        </div>
                    </div>
                </div>
                <div className="row p-2 loginSubmitButton">
                    <button type="submit" className="btn border-0 col-12 shadow-lg rounded-pill buttonHover">Inciar sesión</button>
                </div>
            </form>
        </div>
    )
}

export default Login;