import express from "express";
import {
    changePassword,
    getUser,
    loginUser,
    resetAccessToken,
    registerUser,
    resetPassword,
    updateUser
} from "../controllers/user";
import {authenticate} from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/update", updateUser);
router.get("/", authenticate, getUser);
router.put("/change-password", changePassword);
router.post("/reset", resetPassword);
router.get("/refresh", resetAccessToken);

export default router;