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
    
    let cleanedData = data.filter((item) => item.leadername != null);
    console.log(cleanedData);
    return res.status(200).json(cleanedData);
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

// first does a query to get blogid's that have never had a negative comment.
// second gets the list of users associated with those blogid
export const getUsersWithOnlyPositve = async (req, res) => {
  const sqlStatement =
    'Select blogid from comments where blogId not in (select distinct blogId from comments where sentiment = "negative")';
  db.query(sqlStatement, (err, data) => {
    if (err) return res.json(err);

    // convert data into a list to remove duplicates
    let blogIDlist = [...new Set(data)];
    let blogList = [];

    const sqlStatement2 = "SELECT created_by FROM blogs where blogid in (?);";

    blogIDlist.forEach((item) => {
      blogList.push(item.blogid);
    });

    db.query(sqlStatement2, [blogList], (err, data) => {
      if (err) console.log(err);

      return res.status(200).json(data);
    });
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

    cleanedData = cleanedData.filter((item) => item.usernames.length > 1);

    return res.status(200).json(cleanedData);
  });
};
