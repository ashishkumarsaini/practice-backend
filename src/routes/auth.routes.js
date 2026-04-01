import express from 'express';
import { loginHandler, registerHandler } from '../controllers/auth.controllers.js';
import { registerValidator, loginValidator } from '../validators/auth.validators.js';
import { validateMiddleware } from '../middlewares/validate.middleware.js';

const authRouter = express.Router();

authRouter.post('/register', registerValidator, validateMiddleware, registerHandler);
authRouter.post('/login', loginValidator, validateMiddleware, loginHandler);

export {authRouter};