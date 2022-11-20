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
          <div><h6>{currentUser?.username}</h6></div>
          <Link className="link" to="/">
            <h6>Home</h6>
          </Link>
          <Link className="post" to="/post">
            <h6>Post</h6>
          </Link>
          <Link className="link" to="/temp2">
            <h6>Temp2</h6>
          </Link>
          {currentUser ? (
            <Link className="link" onClick={logout}>
              <h6>Logout</h6>
            </Link>
          ) : (
            <Link classname="link" to="/login">
              <h6>Login</h6>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;