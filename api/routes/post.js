import express from "express";
import { post, getBlog, getBlogsAndBlogID } from "../controllers/post.js";

const router = express.Router();

router.post("/CreatePost", post);
router.get("/getBlogsAndBlogID", getBlogsAndBlogID);
router.get("/:id", getBlog);

export default router;