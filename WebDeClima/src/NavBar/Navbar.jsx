import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import "./Navbar.css";
import { AiOutlineHome } from 'react-icons/ai';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa'
import { Logo } from "../logo/Logo";

const LogInLinks = ({setScrollToSection  }) => {
  const User = useContext(UserContext);
  const user = User.signedUser;
  const isUserLoggedIn = user !== null;

  const handleScrollToSection = () => {
    setScrollToSection (true); // Cambia el estado de Home para desplazarse
  };

  if (!isUserLoggedIn) {
    return (
       ""
    );
  } else {
    return (
      <div className="nav-links mt-4">
        <NavLink to="/home" className="m-3 nav-link">
          <button type="button" className="btn btn-outline-dark buttonHover rounded-pill">
            <AiOutlineHome/>
          </button>
        </NavLink>
        <NavLink to="/home" className="m-3 nav-link">
          <button type="button" className="btn btn-outline-dark buttonHover rounded-pill"
          onClick={handleScrollToSection}>
            <FaHeart />
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

const NavBar = ({setScrollToSection  }) => {
  return (
    <div className="container-fluid nav_container">
      <div className="row">
        <div className="navLinks d-flex">
          <LogInLinks  setScrollToSection={setScrollToSection} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
