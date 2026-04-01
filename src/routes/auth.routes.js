import express from 'express';
import { registerHandler } from '../controllers/auth.controllers.js';
import { registerValidator } from '../validators/auth.validators.js';
import { validateMiddleware } from '../middlewares/validate.middleware.js';

const authRouter = express.Router();

authRouter.post('/register', registerValidator, validateMiddleware, registerHandler);

export {authRouter};