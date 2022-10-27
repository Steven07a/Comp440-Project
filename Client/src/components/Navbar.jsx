import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext, logout } from "../context/authContext";

function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <>
      <div>Navbar</div>
      <div>{currentUser?.username}</div>
      {currentUser ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </>
  );
}

export default Navbar;
