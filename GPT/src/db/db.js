import mongoose from "mongoose";

export async function connectDB(){
    //will help me connect to my DB 
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to MongoDB");
    }
    catch(err){
        console.log("Error Connecting to MongoDB ",err);
    }
}
