import {Router} from 'express';
import {deleteQuest, getQuests, updateQuest, createQuest, submitQuest} from "../controllers/quests.controller.js";
import authorize from "../middlewares/auth.middleware.js";
const questsRouter = Router();

questsRouter.get('/', authorize, getQuests);
questsRouter.post('/', authorize, createQuest);
questsRouter.post('/:id/submit', authorize, submitQuest);
questsRouter.get('/:id', authorize, getQuests);
questsRouter.put('/:id', authorize, updateQuest);
questsRouter.delete('/:id', authorize, deleteQuest);

export default questsRouter;