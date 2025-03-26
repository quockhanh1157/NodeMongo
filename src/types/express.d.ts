import {Request, Response, NextFunction} from "express";
import {JwtPayload} from "jsonwebtoken";

interface CustomRequest extends Request {
    user?: JwtPayload;
}

export default CustomRequest;