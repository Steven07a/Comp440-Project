import React, { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, logout } from "../context/authContext";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Post = () => {
  var cardInfo = {}
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);
  const getPostData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("executeFile/getBlogsAndBlogID")
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const goToCreate = (e) => {
    e.preventDefault();
    navigate("/CreatePost");
  }


  // Progress: currently am able to get backend data from blogs table 
  // TODO: implement way to display blogs data current idea is to do it with cards 

  return (
    <div className="post">
      <form className="data">
        <button onClick={getPostData}>Get Data</button>
        {currentUser ? (<button onClick={goToCreate}>Create a Post</button>):(<h6>Log in to Create a post</h6>)}
        <ul className="blogPost">
          <li>
            <Card>
              <Card.Header as="h5">2020-03-15</Card.Header>
              <Card.Body>
                <Card.Title>Hello World</Card.Title>
                <Card.Text>
                  Hey everyone, this is my first blog. Hello world and all who inhabit it!
                </Card.Text>
              </Card.Body>
            </Card>
          </li>
          <li>
            <Card>
              <Card.Header as="h5">2020-03-17</Card.Header>
              <Card.Body>
                <Card.Title>I love cats!</Card.Title>
                <Card.Text>
                  Cats are amazing. They're awesome, and fuzzy, and cute. Who DOESN'T love cats?
                </Card.Text>
              </Card.Body>
            </Card>
          </li>
          <li>
            <Card>
              <Card.Header as="h5">2020-03-19</Card.Header>
              <Card.Body>
                <Card.Title>Dogs are the best.</Card.Title>
                <Card.Text>
                  So I saw a post the other day talking about cats. Now, I love cats. They're great. But here's the thing: dogs are just the best, okay? There's no question about it. That is all.
                </Card.Text>
              </Card.Body>
            </Card>
          </li>
          <li>
            <Card>
              <Card.Header as="h5">2020-03-24</Card.Header>
              <Card.Body>
                <Card.Title>I am the night.</Card.Title>
                <Card.Text>
                  To all you lowly criminals out there, this is a warning to know I am watching. I am justice. I am righteousness. I am the NIGHT.
                </Card.Text>
              </Card.Body>
            </Card>
          </li>
          <li>
            <Card>
              <Card.Header as="h5">2020-03-31</Card.Header>
              <Card.Body>
                <Card.Title>Waka waka</Card.Title>
                <Card.Text>
                  waka waka waka waka waka waka waka waka waka waka waka waka waka waka waka waka
                </Card.Text>
              </Card.Body>
            </Card> 
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Post;


