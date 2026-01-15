import express from 'express';
import { postRoute } from './module/post/postRoute';
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';
import cors from 'cors';
import { commentRoute } from './module/comment/commentRoute';
const  app= express()
app.use(cors({
    origin: process.env.APP_URL || "http://localhost:4000",
    credentials: true
}))
app.use(express.json());
app.all('/api/auth/{*any}', toNodeHandler(auth));
 app.use('/api/post',postRoute)
 app.use('/api/comment', commentRoute)

 app.get("/", (req, res) => {
    res.send("Hello, World!");
});
 export default app;