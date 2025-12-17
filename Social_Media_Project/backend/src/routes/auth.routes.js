import express from 'express'
import { userModel } from '../models/user.model.js'
import jwt from "jsonwebtoken"
export const router = express.Router()

// POST /register
router.post("/register", async (req, res) => {
    const { userName, password } = req.body;
    try{
        const existingUser = await userModel.findOne({ userName });
        if (existingUser) {
            return res.status(409).json({
                message: "UserName Already Exists use another username"
            });
        }
        const user = await userModel.create({ userName, password });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie("token", token);
        res.status(201).json({
            message: "New User Created",
            user
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//POST /login


//GET /user [protected] : to fetch user data 