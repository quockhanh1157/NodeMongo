import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {JwtPayload} from "jsonwebtoken";
import {HttpError} from "./HttpError";

dotenv.config();
const secretKey = process.env.JWT_SECRET || "defaultSecret";

const generateAccessToken = async (userId: string) => {
    const time: number = Number(process.env.JWT_EXPIRES_IN) || 60 * 10;

    return jwt.sign(
        {id: userId},
        secretKey,
        {expiresIn: time}
    );
};

const generateRefreshToken = async (userId: string) => {
    const secret = process.env.REFRESH_SECRET || "defaultRefreshSecret";
    const time: number = Number(process.env.REFRESH_EXPIRES_IN) || 60 * 60 * 24 * 7; // 7 day

    return jwt.sign(
        {id: userId},
        secret,
        {expiresIn: time}
    );
};

const verifyToken = async (token: string, secret = secretKey) => {
    try {
        return jwt.verify(token, secret) as JwtPayload; // Trả về thông tin nếu hợp lệ
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            throw new HttpError("Refresh token expired", 403); // Lỗi token hết hạn
        }
        throw new HttpError("Invalid refresh token", 403); // Lỗi token sai
    }
};

export {generateAccessToken, generateRefreshToken, verifyToken};