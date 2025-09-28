import {Router} from "express";
import {getUsers, getUser, updateUser, deleteUser} from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middleware.js';
import {getUserQuestHistory} from "../controllers/quests.controller.js";
import questsRouter from "./quests.routes.js";

const userRouter = Router();

userRouter.get('/', authorize, getUsers);
userRouter.get('/:id', authorize, getUser);
userRouter.put('/:id', authorize, updateUser);
userRouter.delete('/:id', authorize, deleteUser);
userRouter.get('/:id/quests', authorize, getUserQuestHistory);

export  default userRouter;