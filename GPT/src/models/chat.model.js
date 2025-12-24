import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    //kon se user ki chat hai 
    user:{
        //jis bhi user ki chat hai uski id rakh de ge  
        type: mongoose.Schema.ObjectId,
        ref:'user',
        required:true
    },
    //chat ka title kya hai 
    title:{
        type:String,
        required:true
    },
    //chat mai last message kab aaya tha 
    lastActivity:{
        type:Date,
        default:Date.now()
    }
},{
    timestamps:true
})

export const chatModel = mongoose.model("chat",chatSchema)