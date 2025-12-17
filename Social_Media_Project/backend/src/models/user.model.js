import mongoose from "mongoose";

// schema level validations : Rules Applied on Schema 
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        //each username should be unique
        unique:true,
        //binausername ke user cant be created 
        required:true
    },
    password:{
        type:String,
        // in google auth it wont be required
    }
})

export const userModel = mongoose.model("user",userSchema)