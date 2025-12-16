import mongoose from "mongoose";

export function connectDB(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Backend Connected to DB");
    }).catch((err)=>{
        console.log(err);
    })
}