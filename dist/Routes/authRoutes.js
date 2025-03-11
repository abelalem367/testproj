"use strict";
// src/routes/authRoutes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../Controllers/authController");
const router = (0, express_1.Router)();
router.post('/signup', authController_1.signUp);
router.post('/login', (req, res, next) => {
    (0, authController_1.login)(req, res).catch(next);
});
exports.default = router;
