import express from "express";
import { post, getBlog, getBlogsAndBlogID, getBlogComments } from "../controllers/post.js";

const router = express.Router();

router.post("/CreatePost", post);
router.get("/getBlogsAndBlogID", getBlogsAndBlogID);
router.get("/:id", getBlog);
router.get("/comment/:id", getBlogComments);

export default router;