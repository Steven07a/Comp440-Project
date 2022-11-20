import React, { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Post = () => {
  const navigate = useNavigate();
  const [cardInfo, setCardInfo] = useState([]);
  const getPostData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("executeFile/getBlogsAndBlogID");
      for (const dates of res.data) {
        dates.pdate = Date(dates.pdate).toString().slice(0, 10);
      }
      console.log(res.data);
      setCardInfo(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const clickCard = (index) => {
    console.log(index)
    navigate("/post?id=" + index);
  }

  //function to render the cards using db data
  const renderCard = () => {
    return cardInfo.map((post, index) => (
      <li>
        <Card onClick={() => clickCard(post.blogid)} key={index}>
          <Card.Header className="cardHeader">
            <h5>{post.pdate} </h5>
            <h5>Tags:{post.tags}</h5>
          </Card.Header>
          <Card.Body>
            <Card.Title>{post.subject}</Card.Title>
            <Card.Text>{post.description}</Card.Text>
          </Card.Body>
        </Card>
      </li>
    ));
  };

  return (
    <div className="post">
      <form className="data">
        <button onClick={getPostData}>Get Data</button>
      </form>
    </div>
  );
};

export default Post;
