import express from "express"
import { runFile } from "../controllers/execute.js";

const router = express.Router()

router.get("/runFile", runFile);

export default router