import express from "express";
import { post, getBlog, getBlogsAndBlogID, getBlogComments, addComment,
     getAllBlogsFromUser, getAllPosComments, getTopCommenter } from "../controllers/post.js";

const router = express.Router();

router.post("/CreatePost", post);
router.get("/getBlogsAndBlogID", getBlogsAndBlogID);
router.get("/:id", getBlog);
router.get("/comment/:id", getBlogComments);
router.post("/addComment", addComment);
router.get("/getAllBlogsFromUser", getAllBlogsFromUser);
router.get("/getAllPosComments", getAllPosComments);
router.get("/getTopCommenter", getTopCommenter);
export default router;