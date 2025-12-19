//token hai yaa nahi , agar token valid hai na , agar token valid hai then user ko find karo and send to db  
// jo request aa rahi hai kya voh ek valid request hai and user data send karke agge bhejo 
//auth middleware aage aane waale user mai logged in user ka data bheje ga 
import jwt from "jsonwebtoken"
import { userModel } from "../models/user.model.js";

export async function authMiddleware (req,res,next){
    const token=req.cookies.token
    if(!token){
        return res.status(401).json({
            mesage:"unauthorized Please Login "
        })
    }
    // kya token sahi hai yaa nahi ----> we will get data 
    //else error 
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        //find user with the help of id 
        const user=await userModel.findOne({
            _id : decoded.id
        })
        //user data ko aage bhejna hai 
        req.user=user
        next()
    }catch(err){
        res.status(401).json({
            message:"Invalid token please login "
        })
    }
}