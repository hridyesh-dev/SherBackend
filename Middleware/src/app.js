// server yaha prr create hoga 
import express from 'express'
import { router as indexRoutes } from './routes/index.routes.js'
export const app = express()

app.use(express.json())

// middleware between app and router 
app.use((req,res,next)=>{
    console.log("this middleware is between App and Route");
    //to pass on the request : usko aage bhejne ke liye 
    next()
})

//yaha prr api mount krr di 
app.use("/",indexRoutes)