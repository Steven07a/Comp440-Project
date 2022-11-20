import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const post = (req, res) => {

    const querey =
      "Insert into blogs (`blogid`, `subject`, `description`, `pdate`, `created_by`) Values (?)";
    const values = [
      req.body.blogid,
      req.body.subject,
      req.body.description,
      req.body.pdate,
      req.body.created_by,
    ];

    console.log(values)

    db.query(querey, [values], (err, data) => {
      if (err) return res.json(err);

      return res.status(200).json("Blog posted");
    });
  };



