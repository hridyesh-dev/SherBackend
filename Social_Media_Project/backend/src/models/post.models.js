import mongoose from "mongoose";

// image , caption , usercreated
const postSchema = new mongoose.Schema({
    //image url 
    image:String,
    //AI gen 
    caption:String,
    //konse user ne create kiya 
    user:{
        //user ki schema type
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
        //baad mai upulate use karege
    }
})

export const postModel = mongoose.model("post",postSchema)