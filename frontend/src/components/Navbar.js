import React from "react";
import { useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../contexts/Auth/AuthContext';



function Navbar() {
  const { setAuth } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-between">
      <Link className="navbar-brand" to="/">
      </Link>
      <ul className="navbar-nav right-margin">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/user" className="nav-link">
            Users
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/login" 
            className="nav-link"
            onClick={()=> { 
              setAuth(false)
              }}>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
