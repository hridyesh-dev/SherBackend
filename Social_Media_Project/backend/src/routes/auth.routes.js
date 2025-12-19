import express from 'express'
import { loginController, registerController } from '../controllers/auth.controller.js';
export const router = express.Router()

//api kon kon si hai 

// POST /register
router.post("/register", registerController);

//POST /login
router.post("/login",loginController)

