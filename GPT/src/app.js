import express from 'express'
import cookieParser from 'cookie-parser'

// Mere Routes 
import { router as authRoutes } from './routes/auth.routes.js'
import { router as chatRoutes } from './routes/chat.routes.js'

export const app = express()

//middlewares
app.use(express.json())
app.use(cookieParser())

//using routes 
app.use('/api/auth',authRoutes)
app.use('/api/chat',chatRoutes)