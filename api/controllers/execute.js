import db from "../db.js";
import fs from "fs";
import path from "path";

export const runFile = (req, res) => {
  // files path is given relative to index.js inside of api folder
  const sqlFiles = "files/";
  const absolutePath = (path.resolve(sqlFiles) + req.body.fileName).toString();
  const query = fs.readFileSync(absolutePath).toString();
  db.query(query, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json("Database Init has finished");
  });
};

export const getBlogsAndBlogID = (req,res) => {
    const sqlStatement =
      "SELECT blogs.*, group_concat(blogstags.tag) as tags FROM blogs Inner join blogstags on blogs.blogid = blogstags.blogid group by blogstags.blogid;";
    db.query(sqlStatement, (err, data) => {
      if(err) return res.json(err);
      return res.status(200).json(data);
    })
}

export const getBlog = (req,res) => {
  const sqlStatement = 
  "Select t.* from (SELECT blogs.*, group_concat(blogstags.tag) as tags FROM blogs Inner join blogstags on blogs.blogid = blogstags.blogid group by blogstags.blogid) as t where blogid = ?;"
  console.log(req.query.id)
  db.query(sqlStatement, req.query, (err, data) => {
    if(err) return res.json(err);
    console.log(data);
    res.console(data);
    // return res.status(200).json(data);
  })
}