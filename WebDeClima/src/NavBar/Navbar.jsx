import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import {UserProvider} from "../context/UserProvider" 
import { getAuth } from "firebase/auth";
import {UserContext} from '../context/userContext'

const LogInLinks = () => {
    const User = useContext(UserContext);
    const user = User.signedUser;
    const isUserLoggedIn = user !== null;

    if (!isUserLoggedIn) {
        return (
            <>
                <Link to="/login" className="m-3"><button type="button" className="btn btn-outline-dark buttonHover">Ingresa</button></Link>
                <Link to="/" className="m-3"><button type="button" className="btn btn-outline-dark buttonHover">Registrate</button></Link>
            </>
        );
    } else {
        return (
            <>
                <NavLink to="/home" className="m-3"><button type="button" className="btn btn-outline-dark buttonHover">Inicio</button></NavLink>
                <NavLink to="/signOut" className="m-3"><button type="button" className="btn btn-outline-dark buttonHover">Cerrar Sesión</button></NavLink>
{/*                 <NavLink to="/perfil" className="nav-link nav-item">Perfil</NavLink>
                <NavLink to="/favorites" className="nav-link nav-item"><button id="botonCerrarSesion" className="botonNavLogin">Mis Favoritos</button></NavLink> */}

            </>
        );
    }
}


const NavBar = () => {

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid justify-content-center">
                <div className="d-flex justify-content-center">
                    <LogInLinks></LogInLinks>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;