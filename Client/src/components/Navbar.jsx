import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext, logout } from "../context/authContext";
import Logo from "../img/logo.png";

function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <img src={Logo} width="200" alt="Logo image" />
        </div>
        <div className="links">
          <Link className="link" to="/">
            <h6>Home</h6>
          </Link>
          <Link className="link" to="/temp1">
            <h6>Temp1</h6>
          </Link>
          <Link className="link" to="/temp2">
            <h6>Temp2</h6>
          </Link>
          
          <div>{currentUser?.username}</div>
          {currentUser ? (
            <Link className="link" onClick={logout}>Logout</Link>
          ) : (
            <Link classname="link" to="/login">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
