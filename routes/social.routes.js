import {Router} from 'express';
const socialRouter = Router();

socialRouter.post('/', (req, res) => res.send({title: 'Post an Action'}));
socialRouter.get('/', (req, res) => res.send({title: 'See the Comunity'}));
socialRouter.post('/:id/comments', (req, res) => res.send({title: 'Comments on Action'}));

export default socialRouter;