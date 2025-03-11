// src/routes/authRoutes.ts

import { Router } from 'express';
import { signUp, login } from '../Controllers/authController';

const router = Router();


router.post('/signup', signUp);
router.post('/login', (req, res, next) => {
    login(req, res).catch(next);
});



export default router;
