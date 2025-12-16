import express from 'express'

const app = express()

/* 
    Assume Postman as Frontend
    
    /notes => data[ title , description ] 
    post --> data frontend --- to ---> backend

*/

//middleware for letting data flow 
//built in middleware 
app.use(express.json())

let notes=[]

// data bhjo = create notes 
// saving data to DB  
app.post("/notes",(req,res)=>{
    
    // printing data that we got 
    console.log(req.body); 
    
    // store it in notes array 
    notes.push(req.body)
    
    //done push it 
    res.status(200).json({
        message:"Notes added sucessfully",
        notes:notes,
        length:notes.length
    })

})

app.listen(3000,()=>{
    console.log("server is   running on port 3000 ");
})