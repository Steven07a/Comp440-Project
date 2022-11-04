import React from "react";
import { useState } from "react";
import axios from "axios";

const Home = () => {
  const [hasRanOnce, setHasRanOnce] = useState(false);
  const [sqlFiles, setSqlFiles] = useState({
    fileName: "\\university.sql",
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
    setHasRanOnce(true);
    executeSqlFromFile(sqlFiles);
  };

  console.log(__filename);

  return (
    <div className="home">
      <form className="data">
        <button onClick={submitSqlCommands}>
          Click me to execute SQL file
        </button>
        <button>Click me to see Data</button>
      </form>
    </div>
  );
};

export default Home;