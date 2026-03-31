import express from 'express';
import { registerHandler } from '../controllers/auth.controllers.js';

const authRouter = express.Router();

authRouter.post('/register', registerHandler);

export {authRouter};