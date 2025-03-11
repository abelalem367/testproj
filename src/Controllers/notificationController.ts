// src/controllers/notificationController.ts

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { addNotification } from '../Services/notificationService'; // Import the service

const prisma = new PrismaClient();

export const getNotifications = async (req: Request, res: Response) => {
  const user = req.body.user; 

  try {
    // Fetch notifications for the user
    const notifications = await prisma.notification.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },  
    });

    if (notifications.length === 0) {
      return res.status(404).json({ message: 'No notifications found for this user.' });
    }

    res.json({ notifications });
  } catch (error: any) {
    console.error("❌ Error fetching notifications:", error);
    res.status(500).json({ error: 'An error occurred while fetching notifications.' });
  }
};



export const createNotification = async (req: Request, res: Response) => {
  const user = req.body.user; 
  const { message,type } = req.body; 

  if (!message) return res.status(400).json({ error: 'Message is required' });
  if (!type) return res.status(400).json({ error: 'Message type is required' });



  try {
    const notification = await addNotification(user.id, message,type);
    res.status(201).json({ notification });
  } catch (error: any) {
    console.error("❌ Error creating notification:", error);
    res.status(500).json({ error: 'An error occurred while creating the notification.' });
  }
};
