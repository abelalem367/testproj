// src/controllers/authController.ts

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { SignJWT } from 'jose';  // Correct import from JOSE

const prisma = new PrismaClient();

const generateToken = (user: { id: number; username: string }) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);  
  const payload = { id: user.id, username: user.username };

  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' }) 
    .setIssuedAt()
    .setExpirationTime('1h')  
    .sign(secret);
};

// Sign Up logic
export const signUp = async (req: Request, res: Response) => {
  const { name, username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, username, email, password: hashedPassword },
    });

    const token = await generateToken(user);  

    res.status(201).json({ user, token });
  } catch (error: any) {
    console.error("❌ Error during user creation:", error); 
    res.status(500).json({ error: `Error during user creation: ${error}` });
  }
};


// Login logic
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  const token = await generateToken(user);  

  res.json({ user, token });
};



