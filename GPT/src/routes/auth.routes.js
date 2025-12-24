import express from 'express'
import { loginUser, registerUser } from '../controller/auth.controller.js'

export const router =  express.Router()

//register
router.post("/register",registerUser)

//login 
router.post("/login",loginUser)
