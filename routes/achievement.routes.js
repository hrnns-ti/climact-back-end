    import {Router} from 'express';
    const achievementRouter = Router();

    achievementRouter.get('/leaderboard', (req, res) => res.send({title: 'Leaderboard'}));
    achievementRouter.get('/badges', (req, res) => res.send({title: 'badges'}));

    export default achievementRouter;