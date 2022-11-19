import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [sqlFiles, setSqlFiles] = useState({
    fileName: "\\ProjDB.sql",
  });
  
  const executeSqlFromFile = async (inputs) => {
    try {
      const res = await axios.post("executeFile/runFile", inputs);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const submitSqlCommands = async (e) => {
    e.preventDefault();
    executeSqlFromFile(sqlFiles);
  };

  const goToPostPage = (e) => {
    e.preventDefault();
    navigate("/post");
  }

  
  return (
    <div className="home">
      <form className="data">
        <button onClick={submitSqlCommands}>
          Init Database
        </button>
        <button onClick={goToPostPage}>Click me to see Data</button>
      </form>
    </div>
  );
};

export default Home;