import mongoose from "mongoose";

export function connectDB(){
    //will help me connect to my DB 
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((err)=>{
        console.log("Error Connecting to MongoDB ");
    })
}
