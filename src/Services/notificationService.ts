import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addNotification = async (userId: number, message: string, type: string) => {
  return await prisma.notification.create({
    data: {
      userId,
      type,
      message,
      createdAt: new Date(), 
    },
  });


  
};