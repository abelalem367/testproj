"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const logger = (0, winston_1.createLogger)({
    level: "info",
    format: winston_1.format.combine(winston_1.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.format.colorize(), winston_1.format.printf(({ level, message, timestamp }) => {
        return `${timestamp} [${level}]: ${message}`;
    })),
    transports: [
        new winston_1.transports.Console()
    ]
});
console.log = (...args) => logger.info(args.map(arg => typeof arg === "object" ? JSON.stringify(arg) : arg).join(" "));
console.error = (...args) => logger.error(args.map(arg => typeof arg === "object" ? JSON.stringify(arg) : arg).join(" "));
console.warn = (...args) => logger.warn(args.map(arg => typeof arg === "object" ? JSON.stringify(arg) : arg).join(" "));
console.info = (...args) => logger.info(args.map(arg => typeof arg === "object" ? JSON.stringify(arg) : arg).join(" "));
console.debug = (...args) => logger.debug(args.map(arg => typeof arg === "object" ? JSON.stringify(arg) : arg).join(" "));
exports.default = logger;
