import express from 'express';
import { registerHandler } from '../controllers/user.controllers.js';

const userRouter = express.Router();

userRouter.post('/register', registerHandler);

export {userRouter};