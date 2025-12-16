import express from 'express';
import multer from 'multer';
import { uploadFile } from '../service/storage.service.js'; // include .js extension
import { song as SongModel } from '../models/songs.model.js';

export const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

//Songs Ko Save Karna hai 
router.post("/songs", upload.single("audio"), async (req, res) => { 
    try{
        // to see our text data
        console.log("Text data:", req.body);
        
        // to see our file data 
        console.log("File data:", req.file);

        //upload the file to image kit 
        const fileData = await uploadFile(req.file);

        //image kit jo result dega voh idhar hoga 
        console.log("Song uploaded to imagekit , ImageKit response:", fileData);


        //image kit pe store karne ke aad db mai store krr do 
        const song=await SongModel.create({
            title:req.body.title,
            artist:req.body.artist,
            mood:req.body.mood,
            audio:fileData.url
        })

        res.status(201).json({
            message: "Song Uploaded to Database  ",
            url: fileData.url,
            song:song
        });

    }catch(error){
        console.error("Upload failed:", error);
        res.status(500).json({ message: "Upload failed", error });
    }
});

// Mood ke According Songs ko Laake de 
//data backend to frontend 
router.get("/songs", async (req,res)=>{
    // mood body mai nahi aaye ga , jo cheez humm search karege jo search baar mai de ge voh querry mai aaye ga  
    const {mood} = req.query;//mood ke bases pe songs dhunde ge 

    //vo saare songs do jinka mood match karta hai 
    const songs  = await SongModel.find({
        mood:mood
    })

    res.status(200).json({
        message:"Songs fetched sucessfully",
        songs   
    })

})