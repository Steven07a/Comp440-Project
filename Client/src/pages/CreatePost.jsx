import React, { useState } from "react";

const CreatePost = () => {
    const [value, setValue] = useState("");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [pdate, setDate] = useState("");
    const [created_by, setUser] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const handleClick = async e=>{ e.preventDefault()}

    return (
        <div className="MakePost">
          <h1>Create New Post</h1>
          <form>
            <input
              name="subject"
              required
              type="text"
              placeholder="Name of Post"
              onChange={e=>setSubject(e.target.value)}
            />
            <textarea
              name="description"
              required
              type="text"
              placeholder="Tell us about your post"
              onChange={e=>setSubject(e.target.value)}
            />
            <button>Post</button>
            {errorMessage && <p>{errorMessage}</p>}
          </form>
        </div>
    );
}
  
  export default CreatePost;