import mongoose from "mongoose";

/* Title: string , Content : String  */
const noteSchema=new mongoose.Schema({
    title:String,
    content:String
}) 

//jiss collection ke andar hamare notes ka data store hoga uska naam Note hai 
export const noteModel = mongoose.model("note",noteSchema)

