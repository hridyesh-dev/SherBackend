//making server using express 
import express from 'express'

const app=express()//iss line pe server create ho jaata hai 

//default route 
app.get("/",(req,res)=>{
    res.send( " THIS IS MY DEFAULT ROUTE  " )
})

//home route
app.get("/home",(req,res)=>{
    res.send( " THIS IS MY HOME  PAGE  " )
})

//about 
app.get("/about",(req,res)=>{
    res.send( "  WELCOME TO ABOUT PAGE   " )
})

//listening to requests 
app.listen(3000,()=>{
    console.log("Server Running on PORT 3000 ");
})