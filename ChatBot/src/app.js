import express from 'express'
//server create krr diya
export const app=express()

app.get("/",(req,res)=>{
    res.send('Hello World! ')
})