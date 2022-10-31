import React from 'react'
import { useState } from 'react';
import axios from "axios"



const Home = () => {
  const [hasRanOnce, setHasRanOnce] = useState(false);
  const input = "../files/university.sql";

  const executeSqlFromFile = async(e) => {
    console.log(input)
    try {
      const res = await axios.get("executeFile/runFile", input);
      console.log(res);
    } catch (err) {
      console.log(err)
    }
  }

  const submitSqlCommands = (e) => {
    setHasRanOnce(true);
    executeSqlFromFile(input);

  }

  //console.log(commands);
  
  return (
    <div className='home'>
      <div className='data'>
        <button onClick={submitSqlCommands}>
          Click me to execute SQL file
        </button>
        <button>
          Click me to see Data
        </button>
      </div>
    </div>
  )
}

export default Home