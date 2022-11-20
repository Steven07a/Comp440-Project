import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";

export default function SinglePost() {
  const [post, setPost] = useState({});
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  const displayDate = () => {
     var date = post.pdate.toString().slice(0, 10);
     return (
        <>
        {date}
        </>
     )
  }

  // Funciton is called whenever variable is changed
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/post/${postId}`);
        console.log(res);
        setPost(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  return (
    <div className="singlePost">
      {/* This code here checks if the current user is the one who made the post if so allow them to edit the post */}
      {currentUser?.username == post.created_by ? <button>Edit post</button> : <></>}
      <h1>{post.created_by}</h1>
      <h2>Subject: {post.subject}</h2>
      <h3>{displayDate()}</h3>
      <p>{post.description}</p>
    </div>
  );
}
