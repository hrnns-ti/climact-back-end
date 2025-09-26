import { Router } from 'express';
import {logOut, signUp, signIn} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);
authRouter.post('/log-out', logOut);

export  default authRouter;