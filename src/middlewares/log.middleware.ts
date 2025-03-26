import { Request, Response, NextFunction } from "express";
import fs from "fs";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const log = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
    fs.appendFileSync("logs.txt", log);
    console.log(log);
    next();
};

export default loggerMiddleware;