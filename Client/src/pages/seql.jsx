import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Seql = () => {
  const [inputs, setInputs] = useState({
    username: "",
  });
  const twoUsers = {
    user1: "scooby",
    user2: "catlover",
  };
  const [positiveComments, setPositiveComments] = useState([]);

  // change handler this is what makes sure we have all the data
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(positiveComments);
  };

  const getPositiveComments = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/post/getAllBlogsFromUser", inputs);
      setPositiveComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getTopCommenter = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("post/getTopCommenter");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // tweoUsers should be input from textboxes
  const getUsersFollowedBy = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("users/getUsersFollowedByXY", twoUsers);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getUsersNeverPosted = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("users/getUsersNeverPost");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getUsersWithOnlyPositve = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("users/getUsersWithOnlyPositve");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getUsersMatchedHobbies = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("users/getUsersMatchedHobbies");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="seql">
      <form className="data">
        <button onClick={getPositiveComments}>Click to Display only positive comments</button>
        <button onClick={getTopCommenter}>Click to show top commenter</button>
        <button onClick={getUsersFollowedBy}>Click to get users who are followed by</button>
        <button onClick={getUsersNeverPosted}>Click to get users who have never posted</button>
        <button onClick={getUsersWithOnlyPositve}>Click to get users with only positive comments</button>
        <button onClick={getUsersMatchedHobbies}>Click to get users' matched hobbies</button>
      </form>
    </div>
  );
};

export default Seql;
