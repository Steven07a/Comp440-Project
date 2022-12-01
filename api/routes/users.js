import express from "express"
import { getAllUsers, getUsersFollowedByXY, getUsersNeverPost,
        getUsersWithOnlyPositve, getUsersMatchedHobbies } from "../controllers/user.js"

const router = express.Router()

router.get("/getAllUsers", getAllUsers);
router.post("/getUsersFollowedByXY", getUsersFollowedByXY);
router.post("/getUsersNeverPost", getUsersNeverPost);
router.post("/getUsersWithOnlyPositve", getUsersWithOnlyPositve);
router.post("/getUsersMatchedHobbies", getUsersMatchedHobbies);

export default router