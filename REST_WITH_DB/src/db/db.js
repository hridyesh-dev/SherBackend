import mongoose from "mongoose";

//server db se kaie coonect hoga this is defined in db.js 
//we will define the way
export function connectToDB(){

    //server ko connect karo from db
    mongoose.connect("")
    .then(()=>{
        console.log(" Connected to DB ");
    }).catch(()=>{
        console.log(" some connection error ");
    })
    //we dont know wha is the speed of internet how much time it will take  
    
}

