import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const getPostData = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.get("executeFile/getBlogsAndBlogID")
        console.log(res.data);
    } catch (err) {
        console.log(err);
    }
  }
  // Progress: currently am able to get backend data from blogs table 
  // TODO: implement way to display blogs data current idea is to do it with cards 

  return (
    <div className="post">
      <form className="data">
        <button onClick={getPostData}>Get Data</button>
        <ul className="blogPost">
            {/* looks like the best way to go about this would be to use react bootstrap cards inside of a ul  */}
            <li>asd</li>
        </ul>
      </form>
    </div>
  );
};

export default Post;
