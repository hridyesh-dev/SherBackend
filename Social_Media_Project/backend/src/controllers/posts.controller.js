
/*
    //yeh sab karne ke liye pehle se logged in hona padega 
    
    POST /api/posts {image-file}
    image file se caption create hoga , usse caption and image ke saath upload hoga 
    protected route only logged in users can do it 

*/

import { generateCaption } from "../service/ai.service.js";

export async  function createPostController( req , res ){
    
    //req.file mai image aae gi 
    const file = req.file

    //yeh file deni hai ai ko aur iss file se caption banani hai 
    console.log("file received ",file)

    // buffer is the actual file data that we try to upload on image kit 
    const base64Image= new Buffer.from(file.buffer).toString('base64')    

    const caption=await generateCaption(base64Image)
    res.json({caption});

}