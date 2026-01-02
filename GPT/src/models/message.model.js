import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
    //userID
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    //CHATID
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"chat"
    },
    //content
    content:{
        type:String,
        required:true
    },
    //JO JO ANSWERS AAYE 
    role:{
        type:String,
        //iss role ki sirf 2 values ho sakti hai 
        enum:["user","model"],
        default:"user"
    }
},{
    timestamps:true
})

export const messageModel=mongoose.model("message",messageSchema);