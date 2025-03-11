// src/middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import { jwtVerify } from 'jose';

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
  console.log("authenticateJWT middleware invoked");

  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);  // Encoding secret as Uint8Array

    // Verify the JWT token
    const { payload } = await jwtVerify(token, secret);  // Await the verification

    // Attach the verified user to the request object
    req.body.user = payload;  // This is now recognized because of the type declaration

    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};
