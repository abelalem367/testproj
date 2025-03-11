"use strict";
// src/controllers/notificationController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotification = exports.getNotifications = void 0;
const client_1 = require("@prisma/client");
const notificationService_1 = require("../Services/notificationService"); // Import the service
const prisma = new client_1.PrismaClient();
const getNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body.user;
    try {
        // Fetch notifications for the user
        const notifications = yield prisma.notification.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' },
        });
        if (notifications.length === 0) {
            return res.status(404).json({ message: 'No notifications found for this user.' });
        }
        res.json({ notifications });
    }
    catch (error) {
        console.error("❌ Error fetching notifications:", error);
        res.status(500).json({ error: 'An error occurred while fetching notifications.' });
    }
});
exports.getNotifications = getNotifications;
const createNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body.user;
    const { message, type } = req.body;
    if (!message)
        return res.status(400).json({ error: 'Message is required' });
    if (!type)
        return res.status(400).json({ error: 'Message type is required' });
    try {
        const notification = yield (0, notificationService_1.addNotification)(user.id, message, type);
        res.status(201).json({ notification });
    }
    catch (error) {
        console.error("❌ Error creating notification:", error);
        res.status(500).json({ error: 'An error occurred while creating the notification.' });
    }
});
exports.createNotification = createNotification;
