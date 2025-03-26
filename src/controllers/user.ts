import {Response, Request, NextFunction} from "express";
import {User, UserType} from "../models/userSchema";
import {comparePassword, hashPassword} from "../utils/bcryptHelper";
import {generateAccessToken, generateRefreshToken, verifyToken} from "../utils/jwtHelper";
import {HttpError} from "../utils/HttpError";
import {JwtPayload} from "jsonwebtoken";
import dotenv from "dotenv";
import CustomRequest from "../types/express";
dotenv.config();

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {username, email, password}: Pick<UserType, "username" | "email" | "password"> = req.body;

        if (!username || !email || !password) {
            throw Error("Missing required information!");
        }

        const checkEmail = await User.findOne({email: email})

        if (checkEmail) {
            throw new Error("Username already exists");
        }
        const hashedPassword = await hashPassword(password);
        await User.create({
            username,
            email,
            password: hashedPassword
        })

        res.status(201).json({message: "Successfully registered"})
    } catch (error) {
        next(error);
    }
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password}: Pick<UserType, "email" | "password"> = req.body;

        if (!email || !password) {
            throw new HttpError("Missing required information!", 400);
        }

        // Tìm user
        const user = await User.findOne({email});
        if (!user) {
            throw new HttpError("Invalid username or password", 401);
        }

        // So sánh mật khẩu
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            throw new HttpError("Invalid username or password", 401);
        }

        // Tạo access token
        const accessToken = await generateAccessToken(user._id.toString());
        const refreshToken = await generateRefreshToken(user._id.toString());

        // Lưu refreshToken vào DB
        await User.updateOne({_id: user._id}, {refreshToken});

        res.status(200).json({accessToken, refreshToken});
    } catch (error) {
        next(error);
    }
}

const getUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw new HttpError("Unauthorized", 401);
        }

        const user = req.user

        const userData = await User.findById(user.id).select("-password -refreshToken"); // Tìm user trong DB
        if (!userData) {
            throw new HttpError("User not found", 404);
        }

        res.status(200).json(userData);
    } catch (error) {
        next(error);
    }
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error);
    }
}

const changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error);
    }
}

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error);
    }
}

const resetAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.headers["refresh-token"]; // Lấy refresh token từ header
        if (!refreshToken) {
            throw new HttpError("Missing refresh token", 401);
        }

        // Giải mã refresh token
        const secret = process.env.REFRESH_SECRET || "defaultRefreshSecret";

        const decoded = await verifyToken(refreshToken as string, secret) as JwtPayload;
        if (!decoded || !decoded.id) {
            throw new HttpError("Invalid refresh token", 403);
        }

        // Kiểm tra trong database xem refresh token có hợp lệ không
        const user = await User.findOne({_id: decoded.id, refreshToken});
        if (!user) {
            throw new HttpError("Refresh token not found or invalid", 403);
        }

        // Tạo access token mới
        const newAccessToken = await generateAccessToken(user._id.toString());

        res.status(200).json({accessToken: newAccessToken});
    } catch (error) {
        next(error);
    }
};

export {registerUser, loginUser, getUser, updateUser, changePassword, resetPassword, resetAccessToken}

