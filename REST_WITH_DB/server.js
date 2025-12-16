import express from 'express'
import {connectToDB} from './src/db/db.js'
import mongoose from 'mongoose'

//server pe crud karne ke liye we wil need model 
import { noteModel } from './src/models/note.model.js' 

const app=express()

//express middleware
app.use(express.json())

//server db se connect = iss file mai likhege 
// implimentation
connectToDB()

//default route 
app.get("/",(req,res)=>{
    console.log("Hello world");
    res.send("Hello world");
})

//front end to backend 

//create
app.post("/notes", async (req,res)=>{
    const {title,content}=req.body;
    console.log(title,content);
    //pass data in object form
    await noteModel.create({
        title,
        content
    })
    res.status(200).json({
        message:"Note created"
    })
})

//read all notes 
app.get("/notes",async(req,res)=>{
    // to fetch everything use fetch 
    const notes = await noteModel.find()
    res.status(200).json({
        message:"Notes fetched sucessfully",
        //all fetched notes
        notes
    })
})

//delete: mai ek ko find karuga aur fir delete krr dunga 
app.delete("/notes/:id", async (req, res) => {
    const notesId = req.params.id;
    const deleted = await noteModel.findOneAndDelete({ _id : notesId });
    if(!deleted) {
        return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
});

//update:
app.patch("/notes/:id",async(req,res)=>{
    const notesId=req.params.id
    const {title}=req.body
    await noteModel.findOneAndUpdate({
        _id:notesId
    },{
        title:title
    })
    res.status(200).json({
        message:"note updated sucessfully"
    })
})

app.listen(3000,()=>{
    console.log("Server running on port 3000");
})