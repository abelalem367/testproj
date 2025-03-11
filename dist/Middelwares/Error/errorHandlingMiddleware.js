"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../Utils/logger"));
const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.status || 500;
    logger_1.default.error(`Error: ${err.message}`, { stack: err.stack, statusCode });
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: err.message || "Internal Server Error",
    });
};
exports.default = errorMiddleware;
