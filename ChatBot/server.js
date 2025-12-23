import { app } from "./src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";

/*
    our server communicates through https 
    now we want to create websocket to have 
    connection between client and servers
*/
const httpServer = createServer(app);

const io = new Server(httpServer, { /* options */ });

//yehi pura socket io ka main code hai  
//jab server se ek naya connect ho tabh yeh event chalega and callback call hoga
io.on("connection", (socket ) => {
    console.log("A user connected ");

    socket.on("disconnect",()=>{
        console.log("A user disconnected ");
    })

    //event ko register kiya hai : jab bhi message event chalega tabh yeh callback chalega 
    socket.on("message",(data)=>{
        console.log(data);
        console.log("message received");
    })

}); 

httpServer.listen(3001,()=>{
    console.log("Server started on port 3001");
})