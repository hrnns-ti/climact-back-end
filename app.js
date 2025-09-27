import express from "express";
import cookieParser from "cookie-parser";

import {PORT} from './config/env.js';

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import questsRouter from "./routes/quests.routes.js";
import socialRouter from "./routes/social.routes.js";
import achievementRouter from "./routes/achievement.routes.js";
import articleRouter from "./routes/article.routes.js";

import connectToDB from "./database/mongodb.js"
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

const app = express();
app.set('trust proxy', true);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
    console.log('🌐 Incoming Request:');
    console.log('   IP:', req.ip);
    console.log('   X-Forwarded-For:', req.headers['x-forwarded-for']);
    console.log('   X-Real-IP:', req.headers['x-real-ip']);
    console.log('   User-Agent:', req.headers['user-agent']);
    next();
});
app.use(arcjetMiddleware)

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/quests', questsRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/social', socialRouter);
app.use('/api/v1/achievements', achievementRouter);
app.use('/api/v1/articles', articleRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.send("Welcome to ClimAct API")
})

app.listen(PORT, async () => {
    console.log(`Listening on http://localhost:${PORT}`);
    await connectToDB();
});

export default app;