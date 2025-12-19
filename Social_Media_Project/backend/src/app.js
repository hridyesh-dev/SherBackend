// yaha server create hoga 
import express from 'express'

import { router as authRouter } from './routes/auth.routes.js';
import { router as postRouter } from './routes/post.routes.js';
import cookieParser from 'cookie-parser';

export const app =  express()



app.use(express.json())

//Inorder to set token in cookies we need to user it 
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)



