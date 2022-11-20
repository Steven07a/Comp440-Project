import express from "express"
import { runFile, getBlogsAndBlogID, getBlog } from "../controllers/execute.js";

const router = express.Router()

router.post("/runFile", runFile);
router.get("/getBlogsAndBlogID", getBlogsAndBlogID);
router.get("/getBlog/:id", getBlog);

export default router