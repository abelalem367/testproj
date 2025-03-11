import { createLogger, format, transports } from "winston";

const logger = createLogger({
    level: "info",
    format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.colorize(),
        format.printf(({ level, message, timestamp }) => {
            return `${timestamp} [${level}]: ${message}`;
        }) 
    ),
    transports: [
        new transports.Console() 
    ]
});

console.log = (...args) => logger.info(args.map(arg => typeof arg === "object" ? JSON.stringify(arg) : arg).join(" "));
console.error = (...args) => logger.error(args.map(arg => typeof arg === "object" ? JSON.stringify(arg) : arg).join(" "));
console.warn = (...args) => logger.warn(args.map(arg => typeof arg === "object" ? JSON.stringify(arg) : arg).join(" "));
console.info = (...args) => logger.info(args.map(arg => typeof arg === "object" ? JSON.stringify(arg) : arg).join(" "));
console.debug = (...args) => logger.debug(args.map(arg => typeof arg === "object" ? JSON.stringify(arg) : arg).join(" "));

export default logger;
