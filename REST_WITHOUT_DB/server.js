import express from 'express'

const app=express()

app.use(express.json())

let notes=[]

app.get("/",(req,res)=>{
    res.send("THIS IS MY Default route ")
})


/* 
    /notes ===> { title , content } 
    /POST = data sending to backend
    /GET = getting notes from db
    
    /DELETE = to delete a particular note 
    req.params = data set as a part of API (eg : id )

    /DELETE/notes/:id    
*/

//saving notes
app.post("/notes",(req,res)=>{
    console.log(req.body);
    notes.push(req.body)
    res.status(200).json({
        message:"Stored sucessfully "
    })
})

//getting all the notes 
app.get("/notes",(req,res)=>{
    res.json(notes);
})

//to remove a particular note :  tells jo value aaye gi that will be dynamic  
// jaha delete hoga waha null aa jaaye ga 
app.delete('/notes/:index',(req,res)=>{
    const index=req.params.index;
    delete notes[index]
    res.status(200).json({
        message:"Deleted sucessfully ",
        notes:notes
    })
})


// to update data we can choose patch option 
// server pe already data hai and usse update karna hai 
// res.params for index and jo title update karna hia usse rakh dena body mai 
app.patch("/notes/:index",(req,res)=>{
    const index=req.params.index
    const title=req.body
    notes[index].title=title;
    res.status(200).json({
        message:"this is updated suessfully"
    })
})


app.listen(3000,()=>{
    console.log("Server is running on port 3000 ");
})