import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const post = (req, res) => {

    const querey =
      "Insert into blogs (`subject`, `description`, `pdate`, `created_by`) Values (?)";
    const values = [
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

export const getBlogsAndBlogID = (req, res) => {
  const sqlStatement =
    "SELECT blogs.*, group_concat(blogstags.tag) as tags FROM blogs Inner join blogstags on blogs.blogid = blogstags.blogid group by blogstags.blogid;";
  db.query(sqlStatement, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const getBlog = (req, res) => {
  const sqlStatement =
    "Select t.* from (SELECT blogs.*, group_concat(blogstags.tag) as tags FROM blogs Inner join blogstags on blogs.blogid = blogstags.blogid group by blogstags.blogid) as t where blogid = ?;";
  db.query(sqlStatement, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data[0]);
  });
};

export const getBlogComments = (req, res) => {
  const sqlStatement =
    "SELECT * FROM comp440_project_test.comments where blogid = ?;";
  db.query(sqlStatement, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};