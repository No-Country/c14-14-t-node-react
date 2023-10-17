import { Link } from "react-router-dom";

const NavBar = () => {

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className="d-flex justify-content-end">
                    <Link to="/" className="mx-2">Registrate</Link>
                    <Link to="/login" className="mx-2">Ingresa</Link>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;