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
// className="container-login" 
        <div className="container-login">

            <h3>Iniciar Sesión</h3>
            <div className="login-buttons-container" >

                <button onClick={()=>signInWithGoogle(navigate)} className="form-control form-control-md text-start" ><FcGoogle style={{ border: "none", background: "none", color: "black" }} />  Iniciar sesion con google</button>
                <button onClick={signInWithFacebook} className="form-control form-control-md text-start"><BsFacebook style={{ border: "none", background: "none", color: "#3b5998" }} />  Iniciar sesion con Facebook</button>

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