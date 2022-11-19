import express from "express"
import { runFile, getBlogsAndBlogID } from "../controllers/execute.js";

const router = express.Router()

router.post("/runFile", runFile);
router.get("/getBlogsAndBlogID", getBlogsAndBlogID);

export default router