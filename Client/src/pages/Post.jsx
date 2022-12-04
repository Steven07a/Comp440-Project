import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Post = () => {
  // const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cardInfo, setCardInfo] = useState([]);

  const clickCard = (index) => {
    navigate("/post/" + index);
  }

  //function to render the cards using db data
  const renderCard = () => {
    return cardInfo.map((post, index) => (
      <li>
        <Card className="cards" onClick={() => clickCard(post.blogid)} key={index}>
          <Card.Header className="cardHeader">
            <h5>{post.pdate} </h5>
            <h5>Tags: {post.tags}</h5>
          </Card.Header>
          <Card.Body>
            <Card.Title>{post.subject}</Card.Title>
            <Card.Text>{post.description}</Card.Text>
          </Card.Body>
        </Card>
      </li>
    ));
  };

  useEffect(() => {
    const getPostData = async () => {
      //e.preventDefault();
      try {
        const res = await axios.get("post/getBlogsAndBlogID");
        // converts dates to yyyy,mm,dd format
        console.log(res);
        for (const dates of res.data) {
          dates.pdate = dates.pdate.toString().slice(0, 10);
        }
        setCardInfo(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getPostData();
  }, []);


  return (
    <div className="post">
      <form className="data">
        <ul className="blogPost">{renderCard()}</ul>
      </form>
    </div>
  );
};

export default Post;
