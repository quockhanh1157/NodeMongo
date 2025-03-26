import {Response, Request, NextFunction} from "express";
import {User, UserType} from "../models/userSchema";
import bcrypt from "bcrypt"
import {hashPassword} from "../utils/bcryptHelper";

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {username, email, password}: Pick<UserType, "username" | "email" | "password"> = req.body;

        if (!username || !email || !password) {
            throw Error("Missing required information!");
        }

        const checkUsername = await User.findOne({username: username})

        if (checkUsername) {
            throw new Error("Username already exists");
        }

        await User.create({
            username,
            email,
            password: hashPassword(password)
        })
    } catch (error) {
        next(error);
    }
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error);
    }
}

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

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

export {registerUser, loginUser, getUser, updateUser, changePassword, resetPassword}

