import express, { Application, NextFunction, Request, Response } from "express";
import config from "./config";
import cors from 'cors';
import bodyParser from "body-parser";
import errorMiddleware from "./Middelwares/Error/errorHandlingMiddleware";
import authRoutes from "./Routes/authRoutes";
import { authenticateJWT } from './Middelwares/authMiddleware';
import { getNotifications, createNotification } from './Controllers/notificationController';  // Import the notification controller

const app: Application = express();

app.use(cors());

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("ready");
});

app.use('/api/auth', authRoutes);

app.get('/api/notifications', (req: Request, res: Response, nexFunc: NextFunction) => { authenticateJWT(req, res, nexFunc);},
(req: Request, res: Response) => {getNotifications(req, res)});  // Fetch notifications for the authenticated user

app.post('/api/notifications', (req: Request, res: Response, nexFunc: NextFunction) => { authenticateJWT(req, res, nexFunc);},
(req: Request, res: Response) => {createNotification(req, res)});  // Fetch notifications for the authenticated user

// Error Middleware for handling 404 and general errors
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use(errorMiddleware);

app.listen(config.port, () => {
  console.log(`App is running on port : ${config.port}`);
});