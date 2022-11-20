import express from "express";
import { post } from "../controllers/post.js";

const router = express.Router();

router.post("/CreatePost", post);

export default router;