import db from "../db.js";

export const getAllUsers = (req, res) => {
  var sqlStatement = "Select * from user";
  res.json("hello");
};

export const getUsersFollowedByXY = async (req, res) => {
  const sqlStatement =
    "SELECT T2.leadername FROM (SELECT * FROM follows WHERE followername = ?) AS T1 LEFT JOIN (SELECT * FROM follows WHERE followername = ?) as T2 ON T1.leadername = T2.leadername;";
  db.query(sqlStatement, [req.body.user1, req.body.user2], (err, data) => {
    if (err) return res.json(err);
    console.log(data);
    return res.status(200).json(data);
  });
};

export const getUsersNeverPost = async (req, res) => {
  const sqlStatement =
    "SELECT T1.username FROM users AS T1 LEFT JOIN blogs AS T2 ON T1.username = T2.created_by WHERE T2.created_by IS NULL;";
  db.query(sqlStatement, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const getUsersWithOnlyPositve = async (req, res) => {
  const sqlStatement =
    "SELECT Distinct U.created_by FROM blogs AS U LEFT JOIN (SELECT B.created_by FROM comments AS C LEFT JOIN blogs AS B ON C.blogid = B.blogid WHERE C.sentiment = 'negative') AS N ON U.created_by = N.created_by WHERE N.created_by IS NULL;";
  db.query(sqlStatement, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const getUsersMatchedHobbies = async (req, res) => {
  const sqlStatement =
    "SELECT Group_Concat(username) as usernames, hobby FROM hobbies group by hobby;";
  db.query(sqlStatement, (err, data) => {
    if (err) return res.json(err);
    let cleanedData = JSON.parse(JSON.stringify(data));
    
    for (let index = 0; index < data.length; index++) { 
        cleanedData[index].usernames.includes(",")
            ? (cleanedData[index].usernames = data[index].usernames.split(","))
            : (cleanedData[index].usernames = [data[index].usernames]);
    }

    cleanedData = cleanedData.filter(item => item.usernames.length > 1);


    return res.status(200).json(cleanedData);
  });
};
