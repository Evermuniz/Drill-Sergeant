import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import logo from "../.././images/logoNoTagline.png";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar bg-body-tertiary fixed-top header">
      <div className="col-1 ps-3">
        <img src={logo} alt="logo" width="50" ></img>
      </div>
      <div className="container-fluid col-11">
        <Link className="navbar-brand" to="/">
          <h1>
            Drill Sergeant
          </h1>
          
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className={`navbar-toggler-icon ${menuOpen ? "open" : ""}`}></span>
        </button>
        <div
          ref={menuRef}
          className={`offcanvas offcanvas-end ${menuOpen ? "show" : ""}`}
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          {Auth.loggedIn() ? (
            <div>
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                  Drill Sergeant
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li className="nav-item">
                    <Link className="nav-link" to="/me">
                      {Auth.getProfile().data.username}'s Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/workout" onClick={closeMenu}>
                      Start Workout
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/goal">
                      Make a Goal
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={logout}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                  Drill Sergeant
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      Signup
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
