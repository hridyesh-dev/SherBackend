import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        uique:true 
    },
    fullName:{
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type: String,
            required: true,
        }
    },
    password:{
        type:String        
    }
    },{
        timestamps:true
    }
)

export const userModel  =  mongoose.model("user",userSchema)