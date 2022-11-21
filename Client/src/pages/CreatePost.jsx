import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";

const CreatePost = () => {
    const { currentUser } = useContext(AuthContext);
    const [inputs, setInputs] = useState({
        blogid: "",
        subject: "",
        description: "",
        pdate: "",
        created_by: "",
      });

    const [errorMessage, setErrorMessage] = useState("");
    const handleClick = async e=>{ e.preventDefault()}
    const handleChange = (e) => {
      console.log(Date().toString())  
      setInputs((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
          pdate: "2022-11-20",
          created_by: currentUser?.username,
          blogid: 11,
        }));
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/post/CreatePost", inputs);
            console.log(res);
        } catch (err) {
            setErrorMessage(err.response.data);
        }
    }

    return (
        <div className="MakePost">
          <h1>Create New Post</h1>
          <form>
            <input
              name="subject"
              required
              type="text"
              placeholder="Name of Post"
              onChange={handleChange}
            />
            <textarea
              name="description"
              required
              type="text"
              placeholder="Tell us about your post"
              onChange={handleChange}
            />
            <button onClick={handleSubmit}>Post</button>
            {errorMessage && <p>{errorMessage}</p>}
          </form>
        </div>
    );
}
  
  export default CreatePost;