import express from 'express'

import { authMiddleware } from '../middlewares/auth.middleware.js';
import multer, { memoryStorage } from 'multer'
import { createPostController } from '../controllers/posts.controller.js';

const upload = multer({storage:memoryStorage()})

export const router = express.Router()

//api kon kon si hai 

// POST /api/post [protected] - imagefile aaye gi 

router.post("/", authMiddleware , upload.single("image"), createPostController );

