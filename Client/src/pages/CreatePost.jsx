import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import moment from "react-moment"

const CreatePost = () => {
    const { currentUser } = useContext(AuthContext);
    const [inputs, setInputs] = useState({
        subject: "",
        description: "",
        pdate: "",
        created_by: "",
        tags: "",
      });

    const [errorMessage, setErrorMessage] = useState("");
    const handleClick = async e=>{ e.preventDefault()}
    const handleChange = (e) => {
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(today.getDate());
      
      setInputs((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
          pdate: date,
          created_by: currentUser?.username,
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
            <input
              name="tags"
              required
              type="text"
              placeholder="tags"
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