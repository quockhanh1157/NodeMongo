import express from "express";
import {changePassword, getUser, loginUser, registerUser, resetPassword, updateUser} from "../controllers/user";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/update", updateUser);
router.get("/", getUser);
router.put("/change-password", changePassword);
router.post("/reset", resetPassword);

export default router;