import express from "express";
import { post, getBlog, getBlogsAndBlogID, getBlogComments, addComment,
     getAllBlogsFromUser, getTopCommenter} from "../controllers/post.js";

const router = express.Router();

router.post("/CreatePost", post);
router.get("/getBlogsAndBlogID", getBlogsAndBlogID);
router.get("/:id", getBlog);
router.get("/comment/:id", getBlogComments);
router.post("/addComment", addComment);
router.post("/getAllBlogsFromUser", getAllBlogsFromUser);
router.post("/getTopCommenter", getTopCommenter);

export default router;