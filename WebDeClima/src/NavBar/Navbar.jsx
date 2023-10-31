import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import "./Navbar.css";
import { AiOutlineHome } from 'react-icons/ai';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa'

const LogInLinks = () => {
  const User = useContext(UserContext);
  const user = User.signedUser;
  const isUserLoggedIn = user !== null;

  if (!isUserLoggedIn) {
    return (
      <div className="nav-links">
        <NavLink to="/login" className="m-3 nav-link">
          <button type="button" className="btn btn-outline-white buttonHover rounded-pill loginButton">
            Iniciar Sesión
          </button>
        </NavLink>
        <NavLink to="/" className="m-3 nav-link">
          <button type="button" className="btn btn-outline-secondary buttonHover rounded-pill registrationButton">
            Registrarme
          </button>
        </NavLink>
      </div>
    );
  } else {
    return (
      <div className="nav-links">
       {/*  <ul class="nav flex-column">
            <li class="nav-item">
                <a class="nav-link active" href="#">Active</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
                <a class="nav-link disabled" href="#">Disabled</a>
            </li>
        </ul> */}
        <NavLink to="/home" className="m-3 nav-link">
          <button type="button" className="btn btn-outline-dark buttonHover rounded-pill">
            <AiOutlineHome/>
          </button>
        </NavLink>
        <NavLink to="/home" className="m-3 nav-link">
          <button type="button" className="btn btn-outline-dark buttonHover rounded-pill">
            <FaHeart/>
          </button>
        </NavLink>
        <NavLink to="/signOut" className="m-3 nav-link">
          <button type="button" className="btn btn-outline-dark buttonHover rounded-pill">
            <FaSignOutAlt/>
          </button>
        </NavLink>
      </div>
    );
  }
};

const NavBar = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="d-flex">
          <LogInLinks></LogInLinks>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
