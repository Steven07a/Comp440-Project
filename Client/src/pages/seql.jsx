import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const seql = () => {
  return (
    <div className="seql">
      <form className="data">
        <input type="text" placeholder="Insert SQL statement"/>
      </form>
    </div>
  );
};

export default seql;
