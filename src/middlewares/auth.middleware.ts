import {NextFunction, Request, Response} from "express";
import {verifyToken} from "../utils/jwtHelper";
import {HttpError} from "../utils/HttpError";
import CustomRequest from "../types/express";

export const authenticate = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new HttpError("Access token missing or invalid", 401));
    }

    const token = authHeader.split(" ")[1];
    try {
        const decode = await verifyToken(token);
        req.user = decode
        next();
    } catch (error) {
        next(new HttpError("Invalid or expired access token", 401));
    }
};