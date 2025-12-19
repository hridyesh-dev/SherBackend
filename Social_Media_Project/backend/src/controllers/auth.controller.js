import { userModel } from '../models/user.model.js'
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

//api ke andar kya hoga aur kese hoga 
export async function registerController(req, res){
    const { userName, password } = req.body;
    try{
        const existingUser = await userModel.findOne({ userName });
        if(existingUser){
            return res.status(409).json({
                message: "UserName Already Exists use another username"
            });
        }
        const user = await userModel.create({ 
            userName, 
            //it is a one way conversion in which we can convert from plain english to hash but not back from it 
            password :await bcrypt.hash(password,10)
        });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie("token", token);
        res.status(201).json({
            message: "New User Created",
            user
        }); 
    }catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export async function loginController(req,res){
    const {userName, password} = req.body;
    //find user in DB
    const user = await userModel.findOne({
        userName
    })
    if(!user){
        res.status(400).json({
            message:"User Not Found "
        })
    }
    // Match Password 
    //jo req se aaya password usko hash karo aur fir compare karo existing hash se 
    const isPasswordValid = await bcrypt.compare(password , user.password)
    if(!isPasswordValid){
        res.status(400).json({
            message:"Invalid Password"
        })
    }
    //if password valid generate token 
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token);
    res.status(201).json({
        message: "User LoggedIn Sucessfully",
        user:{
            userName:user.userName,
            id:user._id
        }
    }); 
}


