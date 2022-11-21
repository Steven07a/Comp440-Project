// imports
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [inputs, setInputs] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // function to check that all input fields are filled in
  const checkEmpty = () => {
    const isEmpty = Object.values(inputs).every(Boolean);
    return isEmpty;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputs.confirmPassword === inputs.password && checkEmpty()) {
      try {
        const res = await axios.post("/auth/register", inputs);
        console.log(res);
        navigate("/login");
      } catch (err) {
        setErrorMessage(err.response.data);
      }
    } else {
      setErrorMessage("check password and try again.");
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          name="username"
          required
          type="text"
          placeholder="username"
          onChange={handleChange}
        />
        <input
          name="firstname"
          required
          type="text"
          placeholder="first name"
          onChange={handleChange}
        />
        <input
          name="lastname"
          required
          type="text"
          placeholder="last name"
          onChange={handleChange}
        />
        <input
          name="email"
          required
          type="email"
          placeholder="email"
          onChange={handleChange}
        />
        <input
          name="password"
          required
          type="password"
          placeholder="password"
          onChange={handleChange}
        />
        <input
          name="confirmPassword"
          required
          type="password"
          placeholder="confirm password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Register</button>
        {errorMessage && <p>{errorMessage}</p>}
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
