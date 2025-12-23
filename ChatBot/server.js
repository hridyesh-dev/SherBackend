import 'dotenv/config'
import { app } from "./src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { generateResponse } from './src/service/ai.service.js';

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
    // on : Listener , emit : emit fire karna  
    socket.on("ai-message", async (data)=>{
        console.log("received ai message : ",data.prompt);
        const response = await generateResponse(data.prompt);
        console.log("AI Response ",response);
        //server ne apni side se event fire kiya 
        socket.emit("ai-message-response",{response})
    })

}); 


httpServer.listen(3001,()=>{
    console.log("Server started on port 3001");
})