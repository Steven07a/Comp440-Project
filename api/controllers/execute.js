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