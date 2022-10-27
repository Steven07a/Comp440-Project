import express from "express";
import { login, logout, register, test } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/test", test);

export default router;
