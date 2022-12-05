import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { isAccordionItemSelected } from "react-bootstrap/esm/AccordionContext";

const Seql = () => {
  const [inputs, setInputs] = useState({
    user1: "",
    user2: "",
  });
  const [positivePost, setPositivePost] = useState([]);
  const [positiveComments, setPositiveComments] = useState([]);
  const [matchedHobbies, setMatchedHobbies] = useState();
  const [usersWithOnlyPositive, setusersWithOnlyPositive] = useState();
  const [usersWhoNeverPost, setUsersWhoNeverPost] = useState();
  const [usersFollowedBy, setUsersFollowedBy] = useState();
  const [topCommenter, setTopCommenter] = useState();

  // change handler this is what makes sure we have all the data
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getPositiveComments = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/post/getAllBlogsFromUser", inputs);
      setPositiveComments(res.data.blogComments);
      setPositivePost(res.data.blogPost);
    } catch (err) {
      console.log(err);
    }
  };

  const renderPositiveComments = () => {
    return (
      <ul>
        {positivePost.map((post, index) => (
          <li>
            <Card className="cards" key={index}>
              <Card.Header className="cardHeader">
                <h3>{post.created_by} </h3>
              </Card.Header>
              <Card.Body>
                <Card.Title>{post.subject}</Card.Title>
                <Card.Text>{post.description}</Card.Text>
                <h6>Positive Comments:</h6>
                {positiveComments.map(
                  (comment, index) =>
                    // conditional statement basically if the comments belong to the same blog then allow them to be posted
                    post.blogid == comment.blogid && (
                      <div>
                        <h5>{comment.posted_by}</h5>
                        <p>{comment.comment}</p>
                      </div>
                    )
                )}
              </Card.Body>
            </Card>
          </li>
        ))}
      </ul>
    );
  };

  const getTopCommenter = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("post/getTopCommenter");
      console.log(res.data);
      setTopCommenter(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderTopCommenter = () => {
    return (
      <>
        <h2>List of top commenters</h2>
        {topCommenter.map((item, index) => (
          <ul>
            <li>{item}</li>
          </ul>
        ))}
      </>
    );
  };

  // tweoUsers should be input from textboxes
  const getUsersFollowedBy = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("users/getUsersFollowedByXY", inputs);
      console.log(res.data);
      setUsersFollowedBy(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderUsersFollowedBy = () => {
    return (
      <>
        <h2>
          Users followed by {inputs.user1}, {inputs.user2}
        </h2>
        {usersFollowedBy.map((item, index) => (
          <ul>
            <li>{item.leadername}</li>
          </ul>
        ))}
      </>
    );
  };

  const getUsersNeverPosted = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("users/getUsersNeverPost");
      console.log(res.data);
      setUsersWhoNeverPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderUsersNeverPosted = () => {
    return (
      <>
        <h2>List of users who have never posted</h2>
        {usersWhoNeverPost.map((item, index) => (
          <ul>
            <li>{item.username}</li>
          </ul>
        ))}
      </>
    );
  };

  const getUsersWithOnlyPositve = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("users/getUsersWithOnlyPositve");
      console.log(res.data);
      setusersWithOnlyPositive(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getUsersMatchedHobbies = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("users/getUsersMatchedHobbies");
      setMatchedHobbies(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderUsersWithOnlyPositive = () => {
    return (
      <>
        <h2>List of users with only positive comments!</h2>
        {usersWithOnlyPositive.map((item, index) => (
          <ul>
            <li>{item.created_by}</li>
          </ul>
        ))}
      </>
    );
  };

  const renderResults = () => {
    return matchedHobbies.map((item, index) => (
      <>
        <h2>{item.hobby}</h2>
        <p style={{ color: "black" }}>{item.usernames + ","}</p>
      </>
    ));
  };

  return (
    <div className="seql">
      <form className="data">
        <input
          name="user1"
          placeholder="Insert user 1"
          onChange={handleChange}
        ></input>
        <input
          name="user2"
          placeholder="Insert user 2"
          onChange={handleChange}
        ></input>
        <button onClick={getPositiveComments}>
          Click to Display only positive comments
        </button>
        <button onClick={getTopCommenter}>Click to show top commenter</button>
        <button onClick={getUsersFollowedBy}>
          Click to get users who are followed by
        </button>
        <button onClick={getUsersNeverPosted}>
          Click to get users who have never posted
        </button>
        <button onClick={getUsersWithOnlyPositve}>
          Click to get users with only positive comments
        </button>
        <button onClick={getUsersMatchedHobbies}>
          Click to get users with matching hobbies
        </button>
        {matchedHobbies && renderResults()}
        {usersWithOnlyPositive && renderUsersWithOnlyPositive()}
        {usersWhoNeverPost && renderUsersNeverPosted()}
        {usersFollowedBy && renderUsersFollowedBy()}
        {topCommenter && renderTopCommenter()}
        {positiveComments && renderPositiveComments()}
      </form>
    </div>
  );
};

export default Seql;
