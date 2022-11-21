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

export const getNumBlogsPostedByUserToday = (req, res) => {
  const values = [
    req.body.created_by,
    req.body.pdate,
  ];
  const sqlStatement = "Select count(*) as NumOfPosts from blogs where created_by = 'created_by' and pdate = 'pdate';";
  console.log(values)
  db.query(sqlStatement, [values], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
}

export const postBlogComment = (req, res) => {
  const values = [
    req.body.sentiment,
    req.body.description,
    req.body.cdate,
    req.body.blogid,
    req.body.posted_by,
  ];
  const sqlStatement = 
    "Insert into comments ('sentiment','description','cdate','blogid','posted_by') Values (?);";
  
  console.log(values)

  db.query(sqlStatement, [values], (err,data) => {
    if (err) return res.json(err);
    return res.status(200).json("Comment osted");
  });
};