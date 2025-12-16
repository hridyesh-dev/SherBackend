//iss file mai server sirf start hoga 
import { app } from "./src/app.js";
import 'dotenv/config';
import { connectDB } from "./src/db/db.js";

//connected to DB 
connectDB()

//sever started listening
app.listen(6000,()=>{
    console.log(" server is running on port 6000 ");
})