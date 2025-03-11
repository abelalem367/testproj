import { Request, Response, NextFunction } from "express";
import logger from "../../Utils/logger";

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.status || 500;

    logger.error(`Error: ${err.message}`, { stack: err.stack, statusCode });

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: err.message || "Internal Server Error",
    });
};

export default errorMiddleware;
