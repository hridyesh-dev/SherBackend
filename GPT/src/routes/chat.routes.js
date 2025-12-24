import express from 'express'
import { authUser } from '../middlewares/auth.middleware.js'
import { createChat } from '../controller/chat.controller.js'
export const router =  express.Router()

//user apni nyi chat create krr sakta hai 
router.post("/",authUser,createChat)