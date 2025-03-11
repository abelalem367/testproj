"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const errorHandlingMiddleware_1 = __importDefault(require("./Middelwares/Error/errorHandlingMiddleware"));
const authRoutes_1 = __importDefault(require("./Routes/authRoutes"));
const authMiddleware_1 = require("./Middelwares/authMiddleware");
const notificationController_1 = require("./Controllers/notificationController"); // Import the notification controller
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.send("ready");
});
app.use('/api/auth', authRoutes_1.default);
app.get('/api/notifications', (req, res, nexFunc) => { (0, authMiddleware_1.authenticateJWT)(req, res, nexFunc); }, (req, res) => { (0, notificationController_1.getNotifications)(req, res); }); // Fetch notifications for the authenticated user
app.post('/api/notifications', (req, res, nexFunc) => { (0, authMiddleware_1.authenticateJWT)(req, res, nexFunc); }, (req, res) => { (0, notificationController_1.createNotification)(req, res); }); // Fetch notifications for the authenticated user
// Error Middleware for handling 404 and general errors
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});
app.use(errorHandlingMiddleware_1.default);
app.listen(config_1.default.port, () => {
    console.log(`App is running on port : ${config_1.default.port}`);
});
