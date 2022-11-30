import express from "express"
import { getAllUsers, getUsersFollowedByXY, getUsersNeverPost,
        getUsersWithOnlyPositve, getUsersMatchedHobbies } from "../controllers/user.js"

const router = express.Router()

router.get("/getAllUsers", getAllUsers);
router.get("/getUsersFollowedByXY", getUsersFollowedByXY);
router.get("/getUsersNeverPost", getUsersNeverPost);
router.get("/getUsersWithOnlyPositve", getUsersWithOnlyPositve);
router.get("/getUsersMatchedHobbies", getUsersMatchedHobbies);

export default router