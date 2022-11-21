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
  const [inputs, setInputs] = useState({
    comments: "",
    sentiment: "negative",
  });
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  // Funciton is called whenever variable is changed
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const res = await axios.get(`/post/${postId}`);
        console.log(res.data);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPostData();

    const fetchComments = async () => {
      try {
        const res = await axios.get(`/post/comment/${postId}`);
        console.log(res.data);
        setPostComments(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchComments();

  }, [postId]);

  const renderComments = () => {
    
    return postComments.map((comment,index) => ( 
      <div className="comments mt-4 text-justify float-left">
        <h4>{comment.posted_by}</h4>
        <span>{comment.cdate.toString().split(0,5)}</span>
        <br />
        <p>
          {comment.description}
        </p>
      </div>
    ));
  };

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
            { currentUser.username == post.created_by && <div className="edit">
              <Link to={"/write?edit="}>edit</Link>
              delete
            </div> }
          </div>
        </div>
        {/* <p>{post.pdate.toString().slice(0,10)}</p> */}
        {<p>{post.pdate}</p>}
        <h1>{post.subject}</h1>
        <p>
          {post.description}
        </p>
      </div>
      <div className="commentsContainer">
        <Card className="commentCard">
          <Card.Header>Recent Comments</Card.Header>
          <Card.Body>
            {renderComments()}
            <div className="inputComment">
              <input></input>
              <BootstrapSwitchButton
                width={150}
                onlabel="Positive"
                offlabel="Negative"
                onChange={handleToggle}
              ></BootstrapSwitchButton>
              <button className="submitComment">submit comment</button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
