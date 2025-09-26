import {Router} from 'express';
const questsRouter = Router();

questsRouter.get('/', (req, res) => res.send({title: 'Quests List'}));
questsRouter.post('/:id/submit', (req, res) => res.send({title: 'Quests Submit'}));
questsRouter.get('/:id', (req, res) => res.send({title: 'Quests Detail'}));
questsRouter.put('/:id', (req, res) => res.send({title: 'Update Quest'}));
questsRouter.delete('/:id', (req, res) => res.send({title: 'Delete Detail'}));

export default questsRouter;