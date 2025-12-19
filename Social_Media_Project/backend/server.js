// yaha server start hoga aur db connect karege 

import 'dotenv/config'
import { app } from "./src/app.js";
import { connectDB } from "./src/db/db.js";


//app yaha connect hoga
connectDB()

//app yaha start hoga 
app.listen(8000,()=>{
    console.log("Server is running on port 8000");
})
