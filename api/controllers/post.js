import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// NOTE TO SELF QUERIES MUST BE NESTED TO MAKE SURE IT STOPS ON ERROR
export const post = (req, res) => {
  var blogId;
  var blogTagsValues = [];

  // returns an error if user has made more then 2 post today
  const q1 =
    "SELECT * FROM blogs, users WHERE blogs.created_by = users.username AND users.username = ? AND blogs.pdate = ? ";
  db.query(q1, [req.body.created_by, req.body.pdate], (err, data) => {
    if (err) return res.json(err);
    // console.log(data)
    if (data.length >= 2)
      return res.status(409).json("user has reached post limit");
    console.log(data);
    // create query and insert into blogs post
    const querey =
      "Insert into blogs (`subject`, `description`, `pdate`, `created_by`) Values (?)";
    const values = [
      req.body.subject,
      req.body.description,
      req.body.pdate,
      req.body.created_by,
    ];

    db.query(querey, [values], (err, data) => {
      if (err) return res.json(err);

      // run a query to get the users post id
      const q2 = "Select MAX(blogid) as blogid from blogs where created_by = ?";
      db.query(q2, [req.body.created_by], (err, data) => {
        if (err) return res.status(409).json(err);

        if (data.length) {
          blogId = data[0].blogid;
        } else {
          blogId = 0;
        }
        const tagsList = req.body.tags.split(",");

        console.log(blogId);
        // inserting blogtags with the corresponding id
        for (var i = 0; i < tagsList.length; i++) {
          blogTagsValues.push([blogId, tagsList[i]]);
        }
        console.log(blogTagsValues);
        const q3 = "Insert INTO blogstags values ?;";
        db.query(q3, [blogTagsValues], (err, data) => {
          if (err) return console.log(err);
          return res.status(200).json("Blog posted");
        });
      });
    });
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

//1st return all comments made by user this day from sql
// Jack - Ok so first check if user has posted 3 comments today -> 409 comment limit reached
export const addComment = async (req, res) => {
  // run a query looking for any comments made by this user on this post on this day.
  const sqlStatement1 =
    "SELECT * FROM comments WHERE comments.posted_by = ? AND comments.cdate = ?;";
  db.query(sqlStatement1, [req.body.username, req.body.cdate], (err, data) => {
    if (err) return res.json(err);

    //console.log(data);
    if (data.length >= 3)
      return res.status(409).json("comment limit has been reached");

    //run query to insert comments if above check passes
    const sqlStatement2 =
      "Insert into comments (`sentiment`, `description`, `cdate`, `blogid`, `posted_by`) Values (?)";
    const values = [
      req.body.sentiment,
      req.body.description,
      req.body.cdate,
      req.body.blogid,
      req.body.username,
    ];
    //console.log(values)
    db.query(sqlStatement2, [values], (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.status(200).json("comment was posted");
    });
  });
};

//gets all positive comments for a single blog + the blog its from
export const getAllBlogsFromUser = async (req, res) => {
  const sqlStatement =
    "SELECT blogs.*, comments.description AS comments, comments.sentiment, comments.posted_by FROM blogs INNER JOIN comments ON blogs.blogid = comments.blogid WHERE comments.sentiment = 'positive' and blogs.created_by = ?;";
  db.query(sqlStatement, [req.body.user1], (err, data) => {
    if (err) return res.json(err);
    //console.log(data);
    let cleanedData = [];
    let blogPost = [];
    let blogComments = [];

    // array to cleanup data basically i want to make it so all post have an array of there comments
    for (let index = 0; index < data.length; index++) {
      // check if blog is already inside of array if not then add it to array
      const found = blogPost.some((temp) => temp.blogid == data[index].blogid);
      if(!found) {
         blogPost.push({
          blogid: data[index].blogid,
          subject: data[index].subject,
          description: data[index].description,
          pdate: data[index].pdate,
          created_by: data[index].created_by,
         })
      }

      blogComments.push({
        blogid: data[index].blogid,
        comment: data[index].comments,
        posted_by: data[index].posted_by
      })
    }

    cleanedData = {blogPost, blogComments}
    // console.log(cleanedData.blogComments[1]);


    return res.status(200).json(cleanedData);
  });
};

//Jack - get the count of comments from the top commenters
//gonna do this by returning the count of comments in decending order sooo to get the top you need to iterate

export const getTopCommenter = (req, res) => {
  let values = [];
  const sqlStatement =
    "SELECT COUNT(posted_by) AS comment_count, posted_by FROM comments GROUP BY (posted_by) ORDER BY comment_count DESC;";
  db.query(sqlStatement, (err, data) => {
    if (err) return res.status(409).json(err);

    let max = data[0].comment_count;
    for (let i = 0; i < data.length; i++) {
      if (data[i].comment_count != max) {
        break;
      } else {
        values.push(data[i].posted_by);
      }
    }

    return res.status(200).json(values);
  });
};
