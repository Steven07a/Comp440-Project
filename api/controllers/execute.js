import db from "../db.js";
import fs from "fs"
// import sqlFile from "../../Client/src/files/university.sql"

export const runFile = (req, res) => {
  const query = fs.readFileSync("C:/Users/steve/Desktop/CS_stuff/comp 440 database design/Comp 440 Group Project/Client/src/files/university.sql").toString();
  // THINGS TO NOTE ABSOLUTE PATH HAS TO BE GIVEN FOR NOW AND THIS QUERY DELETES OUR USERS
  db.query(query, (err,result) => {
    if(err) return res.json(err);
    return res.status(200).json("Database Init has finished")
  })
};
