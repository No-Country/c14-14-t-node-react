import { signInWithGoogle } from "./signInWithGoogle";
import { signInWithFacebook } from "./signInWithFacebook";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from 'react-icons/bs'
import { FaUserAlt } from 'react-icons/fa'
import { RiLockPasswordFill } from 'react-icons/ri'
import {Link, useNavigate} from "react-router-dom";
import { signInWithEmail } from "./signInWithEmail";
import { useState } from "react";

const Login = () => {
    const navigate = useNavigate();

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
        signInWithEmail(userEmail,userPassword)
        console.log(FormData,user);
        navigate("/home")
    }

    return (
// className="container-login" 
        <div className="container-login">

            <h3 >Iniciar Sesión</h3>
            <div className="login-buttons-container" >

                <button onClick={signInWithGoogle} className="form-control form-control-md text-start" ><FcGoogle style={{ border: "none", background: "none", color: "black" }} />  Iniciar sesion con google</button>
                <button onClick={signInWithFacebook} className="form-control form-control-md text-start"><BsFacebook style={{ border: "none", background: "none", color: "#3b5998" }} />  Iniciar sesion con Facebook</button>

            </div>
            <div className="lines-container">

                <div className="line"></div>
                <div className="circle"></div>
                <div className="line"></div>
            </div>


            <form action="" className=" login-buttons-container" onSubmit={handleSubmit}>
                <div className="form-control form-control-md text-start d-flex align-items-center">
                    <FaUserAlt style={{ background: "none", marginRight: "7px" }} />
                    <input type="text"
                        placeholder="correo electronico"
                        className="form-control"
                        name="userEmail"
                        value={userEmail}
                        onChange={handleChange}
                        style={{ border: "none", background: "none", color: "black" }} />
                </div>
                <div className="form-control form-control-md text-start d-flex align-items-center">
                    <RiLockPasswordFill style={{ background: "none", marginRight: "7px" }} />
                    <input type="password"
                        placeholder="contraseña"
                        name="userPassword"
                        value={userPassword}
                        onChange={handleChange}
                        className="form-control form-control-md"
                        style={{ border: "none", background: "none", color: "black" }} />
                </div>



                <button className="btn btn-outline-light" style={{ color: "black" }} type="submit">Inciar sesión</button>

            </form>


            <Link to="/" className="link_regitration">No tienes cuenta?</Link>
        </div>

    )
}

export default Login;