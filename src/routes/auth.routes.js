import express from 'express';
const authRouter = express.Router();
import { registerController } from '../controllers/auth.controller.js';
import { registerValidator } from '../validation/auth.validator.js';
import {verifyEmail} from '../controllers/auth.controller.js'
import { loginController } from '../controllers/auth.controller.js';
import { loginValidator } from '../validation/auth.validator.js';
import { getMe } from '../controllers/auth.controller.js';
import { authMiddleWare } from '../middlewares/auth.middleware.js';

authRouter.post('/register',registerValidator,registerController);
authRouter.get('/verify-email',verifyEmail);
authRouter.post('/login',loginValidator,loginController);
authRouter.get('/get-me',authMiddleWare,getMe);


export default authRouter ; 
