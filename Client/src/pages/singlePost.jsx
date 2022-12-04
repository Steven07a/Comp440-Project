import React, { useContext, useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { Card } from "react-bootstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

export default function SinglePost() {
  const [post, setPost] = useState({});
  const { currentUser } = useContext(AuthContext);
  const [postComments, setPostComments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputs, setInputs] = useState({
    description: "",
    sentiment: "negative",
    username: "",
    cdate: "",
    blogid: "",
  });
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  var today = new Date();
  const date =
    today.getFullYear() +
    "-" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate());

  // Funciton at begining of page load
  useEffect(() => {
    // Defines fetching post data 
    const fetchPostData = async () => {
      try {
        const res = await axios.get(`/post/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    
    // calls fetching post data
    fetchPostData();

    // Defines getting comment data
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/post/comment/${postId}`);
        setPostComments(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    // calls getting comment data
    fetchComments();
  }, []);

  useEffect(() => {
    // loops through all comments and if the user has already commented on this post set variable to true
    postComments.map((comment, index) => {
      console.log(comment.posted_by);
      if (comment.posted_by === currentUser.username) {
        setErrorMessage("User has already commented");
      }
    });
  }, [postComments])

  // redners the comments 
  const renderComments = () => {
    return postComments.map((comment, index) => (
      <div className="comments">
        <h4>{comment.posted_by}</h4>
        <span>{comment.cdate.toString().split(0, 5)}</span>
        <br />
        <p>{comment.description}</p>
      </div>
    ));
  };

  // handles the submition of a comment and displays an error if there is one
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(errorMessage == "") {
      try {
        //console.log(inputs);
        const res = await axios.post("/post/addComment", inputs);
        //reload the page to lock user out of commenting
        window.location.reload(true);
      } catch (err) {
        setErrorMessage(err.response.data);
      }
    }
  };

  // change handler this is what makes sure we have all the data
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      username: currentUser.username,
      cdate: date,
      blogid: postId,
    }));
    console.log(errorMessage)
  };

  // handle if the comment is positive or negative
  const handleToggle = () => {
    if (inputs.sentiment == "negative") {
      inputs.sentiment = "positive";
    } else {
      inputs.sentiment = "negative";
    }
    console.log(inputs.sentiment);
  };

  return (
    <div className="singlePost">
      <div className="content">
        <div className="user">
          <div className="info">
            <span>{post.created_by}</span>
            {currentUser.username == post.created_by && (
              <div className="edit">
                <Link to={"/write?edit="}>edit</Link>
                delete
              </div>
            )}
          </div>
        </div>
        {/* <p>{post.pdate.toString().slice(0,10)}</p> */}
        {<p>{post.pdate}</p>}
        <h1>{post.subject}</h1>
        <p>{post.description}</p>
      </div>
      <div className="commentsContainer">
        <Card className="commentCard">
          <Card.Header>Recent Comments</Card.Header>
          <Card.Body>
            {renderComments()}
            {/* shows comment input box only if the current logged in user is not on his own post */}
            {(currentUser.username !== post.created_by) && (
              <div className="inputComment">
                <input name="description" onChange={handleChange}></input>
                {errorMessage && (
                  <span className="errorMessage">{errorMessage}</span>
                )}
                <BootstrapSwitchButton
                  width={150}
                  onlabel="Positive"
                  offlabel="Negative"
                  onChange={handleToggle}
                ></BootstrapSwitchButton>
                <button className="submitComment" onClick={handleSubmit}>
                  submit comment
                </button>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
