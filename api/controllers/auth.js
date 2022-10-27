import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  // check for existing user
  const querey = "Select * from user where email = ? or username = ?";
  //console.log(querey)
  db.query(querey, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exist");

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const querey =
      "Insert into user (`username`, `password`, `firstname`, `lastname`, `email`) Values (?)";
    const values = [
      req.body.username,
      hash,
      req.body.firstname,
      req.body.lastname,
      req.body.email,
    ];

    // console.log(values)

    db.query(querey, [values], (err, data) => {
      if (err) return res.json(err);

      return res.status(200).json("User has been created");
    });
  });
};

export const login = (req, res) => {
  // check if user exist or not
  const query = "Select * from user where username = (?)";

  db.query(query, [req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length == 0) return res.status(404).json("User not found!");

    // check password
    const isPaswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPaswordCorrect)
      return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ username: data[0].username }, "jwtkey");
    // this code is used to seperate the users password from there data
    // this is important as were sending the user data back to frontend
    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out")
};

export const test = (req, res) => {
  res.json("it worked");
};
