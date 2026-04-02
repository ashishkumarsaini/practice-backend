import express from 'express';
import { loginHandler, logoutHandler, registerHandler } from '../controllers/auth.controllers.js';
import { registerValidator, loginValidator } from '../validators/auth.validators.js';
import { validateMiddleware } from '../middlewares/validate.middleware.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';

const authRouter = express.Router();

authRouter.post('/register', registerValidator, validateMiddleware, registerHandler);
authRouter.post('/login', loginValidator, validateMiddleware, loginHandler);
authRouter.post('/logout', verifyJwt, logoutHandler);

export {authRouter};