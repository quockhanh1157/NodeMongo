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
router.patch("/update", authenticate, updateUser);
router.get("/", authenticate, getUser);
router.put("/change-password", authenticate, changePassword);
router.post("/reset", resetPassword);
router.get("/refresh", authenticate, resetAccessToken);

export default router;