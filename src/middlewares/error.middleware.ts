import {Request, Response, NextFunction} from "express";
import fs from "fs";
import {HttpError} from "../utils/HttpError";

const errorMiddleware = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const timestamp = new Date().toISOString();
    const separator = "-".repeat(80); // Dòng kẻ ngang
    const stackTrace = err.stack ? err.stack.split("\n").slice(0, 3).join("\n") : "No stack trace";

    // Log error ra console (màu đỏ)
    console.error("\x1b[31m%s\x1b[0m", `[ERROR] ${timestamp} - ${err.message}\n${stackTrace}`);

    // Ghi log vào file
    const log = `\n${separator}
[ERROR] - ${timestamp}
URL: ${req.method} ${req.originalUrl}
Message: ${err.message}
StackTrace: 
${stackTrace}
${separator}\n`;

    fs.appendFileSync("logsError.txt", log);

    // Trả về lỗi
    res.status(statusCode).json({
        message: "Có lỗi xảy ra!",
        error: err.message || "Lỗi không xác định",
    });
};

export default errorMiddleware;