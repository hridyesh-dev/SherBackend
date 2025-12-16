import express from 'express'
import { router as authRoutes } from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'

//server created and exported 
export const app=express()

app.use(express.json())
app.use(cookieParser())

// auth related API 
app.use("/auth",authRoutes)
