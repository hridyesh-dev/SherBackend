import { userModel } from "../models/user.model.js";
import jwt from 'jsonwebtoken'

export async function  authUser(req,res,next) {
    const {token}=req.cookies
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    try{
        // decode the jwt token 
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        //finding te user from the id that we got from decoded token 
        const user = await userModel.findById(decoded.id)
        //setting token in req body so that we know who requested 
        req.user=user;
        //calling next chunk of code 
        next()
    }catch(error){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
} 