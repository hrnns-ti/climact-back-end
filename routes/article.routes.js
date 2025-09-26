import {Router} from 'express';
const articleRouter = Router();

articleRouter.get('/', (req, res) => res.send({title: 'Article List'}));
articleRouter.post('/', (req, res) => res.send({title: 'Post New Article'}));
articleRouter.put('/:id', (req, res) => res.send({title: 'Update Article'}));
articleRouter.get('/:id', (req, res) => res.send({title: 'Delete Article'}));

export default articleRouter;