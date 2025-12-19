import 'dotenv/config';
import express from 'express'
import { userModel } from '../models/user.model.js'
import jwt from "jsonwebtoken"

export const router = express.Router()

// POST /auth/register : ek user create karo 
router.post("/register",async (req,res)=>{
    
    const {userName,password} = req.body;
    
    const user = await userModel.create({
        userName,
        password
    })

    //token create karo : iske andar user ka data rakho 
    const token = jwt.sign({
        //hrr user ke liye unique hai 
        id:user._id,
    },process.env.JWT_SECRET)

    // cookie mai token ko set krr do 
    res.cookie("token",token)
    
    return res.status(201).json({
        message:"New User Registered Sucessfully",
        user
    })

})

// POST /auth/login 
router.post("/login",async (req,res)=>{
    
    const {userName,password} = req.body;
    
    // Jo username diya hai kya voh exist karta hai and kya password match karta hai 
    const isUserExists = await userModel.findOne({
        //jo username req.body mai se diya hai uske bases pe find karo 
        userName:userName
    })

    //agar user exist nahi karta  401: unauthorized 
    if(!isUserExists){
        return res.status(401).json({
            message:"user account not found"
        })
    }

    //agar account exist karta hai then password check karo 
    // Jo password req.body mai aa raha hai kya vo match karta hai 
    const isPasswordValid = password === isUserExists.password;

    if(!isPasswordValid){
        return res.status(401).json({
            message:"Password is not valid "
        })
    }

    // after user is logged in give it a token 
    const token=jwt.sign({id:isUserExists._id},process.env.JWT_SECRET)
    
    //will expire after 7 days : after login done set it in cookie
    //server stores cookie in frontend 
    res.cookie("token",token,{
        expires:new Date(Date.now()+1000*60*60*24*7)
    })

    return res.status(200).json({
        message:"User LoggedIn  Sucessfully"
    })

})

//GET /auth/user : to fetch userdata 
router.get('/user',async(req,res)=>{
    
    // tiny piece of data sent with every http request 
    //cookies mai jo data send karoge voh hrr ek http request ke saath server pe jaaye ga 
    const token = req.cookies.token
    
    //agar account nahi hoga toh token bhi nahi hoga 
    if(!token){
        return res.status(401).json({
            message:"Unauthorized No token sent "
        })
    }
    try{
        //verify the token before sending user data 
        //user ki id mill jaaye gi 
        let decodedToken = jwt.verify(token,process.env.JWT_SECRET)
        
        //find user data 
        const user = await userModel.findOne({
            //voh user bhejo jaha id match krr rahi hai 
            _id:decodedToken.id
            //password db se read hii nahi hoga 
        }).select("-password -__v")

        res.status(200).json({
            message:"User data fetched sucessfully",
            user
        })

    }catch(err){
        //user ne galat token bheja iska matalb voh unauthorised hai 
        return res.status(401).json({
            message:"Unautorized - Invalid Token"
        })
    }

})

// GET /auth/logout
res.get('/logout',(req,res)=>{
    res.clearCookie("token")
    res.status(200).json({
        message:"User Logged Out Sucessfully"
    })
})

