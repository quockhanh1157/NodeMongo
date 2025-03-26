import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_SECRET || "defaultSecret";

const generateAccessToken = (userId: string) => {
    const time: number = Number(process.env.JWT_EXPIRES_IN) || 3600; // 3600s = 1h

    return jwt.sign(
        {id: userId},
        secret,
        {expiresIn: time}
    );
};

const generateRefreshToken = (userId: string) => {
    const secret = process.env.REFRESH_SECRET || "defaultRefreshSecret";
    const time: number = Number(process.env.REFRESH_EXPIRES_IN) || 3600 * 24 * 7; // 3600s = 1h

    return jwt.sign(
        {id: userId},
        secret,
        {expiresIn: time}
    );
};

const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        return null;
    }
};

export {generateAccessToken, generateRefreshToken, verifyToken};