// http is a module but catme is a package 
import http from 'http';

//server create ho gaya hai 
const server=http.createServer((req,res)=>{
    // agar koi request aayi toh yeh krr do  
    res.end(" Hello world from the server !!! ")
})

//still need to start the server 
//server ko start karne ke liye usse listen kare ga 
//koi request aaye gi server will listen it 
server.listen(3000,()=>{
    console.log("server is  listening on port 3000 ");
})

