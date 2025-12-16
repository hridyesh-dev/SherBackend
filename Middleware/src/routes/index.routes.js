import express from 'express'
export const router=express.Router();

router.use((req,res,next)=>{
    console.log("this middleware is between router and api ");
    next()
})

router.get("/",(req,res)=>{
    res.json({
        message:"Welcome to the Cohort "
    })
})

//api create ki hai index.routes.js file mai isse server pe mount karo 