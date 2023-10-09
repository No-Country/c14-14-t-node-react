import {Link} from "react-router-dom";
import Login from "./Login"

const Registration = () => {
    return (
        <>
        <div className="containerRegistration">
            <div>
                <h1>Registrate!</h1>
                <div className="registrationEmail">
                    <span>Usuario(email)</span>
                    <input type="text" name="" id="" />
                </div>
                <div className="registrationPassword">
                    <span>Contraseña</span>
                    <input type="password" />
                </div>
                <div className="registrationButton">
                    <Link to={"/login"}> <h3>Ya estas registrado? </h3><button>Ingresa!</button></Link>
                    
                </div>
            </div>
        </div>
        </>
    )
}

export default Registration;