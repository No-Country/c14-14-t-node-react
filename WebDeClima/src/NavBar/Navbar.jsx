import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import {UserProvider} from "../context/UserProvider" 
import { getAuth } from "firebase/auth";
import {UserContext} from '../context/userContext'
import "./Navbar.css"

const LogInLinks = () => {
    const User = useContext(UserContext);
    const user = User.signedUser;
    const isUserLoggedIn = user !== null;

    if (!isUserLoggedIn) {
        return (
            <>
                <NavLink to="/login" className="m-3 nav-link"><button type="button" className="btn btn-outline-white buttonHover rounded-pill loginButton">Iniciar Sesión</button></NavLink>
                <NavLink to="/" className="m-3 nav-link"><button type="button" className="btn btn-outline-secondary buttonHover rounded-pill registrationButton">Registrarme</button></NavLink>
            </>
        );
    } else {
        return (
            <>
                <NavLink to="/home" className="m-3 nav-link"><button type="button" className="btn btn-outline-dark buttonHover rounded-pill">Inicio</button></NavLink>
                <NavLink to="/locationWeather" className="m-3 nav-link"><button type="button" className="btn btn-outline-dark buttonHover rounded-pill">Clima X locación</button></NavLink>
                <NavLink to="/signOut" className="m-3 nav-link"><button type="button" className="btn btn-outline-dark buttonHover rounded-pill">Cerrar Sesión</button></NavLink>

{/*                 <NavLink to="/perfil" className="nav-link nav-item">Perfil</NavLink>
                <NavLink to="/favorites" className="nav-link nav-item"><button id="botonFavoritos" className="botonNavLogin">Mis Favoritos</button></NavLink> */}

            </>
        );
    }
}


const NavBar = () => {

    return (
        <nav className="container-fluid navbar navbar-expand-lg">
            <div className="container-fluid justify-content-center">
                <div className="d-flex justify-content-center">
                    <LogInLinks></LogInLinks>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;