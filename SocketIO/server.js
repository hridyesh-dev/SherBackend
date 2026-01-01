import "dotenv/config"
import { app } from "./src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { generateResponse } from "./src/services/ai.service.js";

//socket : user , io:server
// emit:fire event , on:event listen 

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

//low latency , event based io: server , socket:user , persistant , bidirectional 
io.on("connection", (socket) => {
    //JAB naya connection banega tabh yeh chalega
    console.log( " User Connected to server " );

    // predefined events : connection and disconnect 
    // and custom events : Jo humm khud banate hai 


    //jab disconnect hoga toh halega 
    socket.on("disconnect",()=>{
        console.log(" User Disconnected from Server");
    })

    //custom event also sending data in it  text , json , binary:JSON 
    // CLIENT(postman) -------------> Server
    socket.on("ai-message",async (data)=>{
        console.log("Message received from user : ",data.prompt);
        const response= await generateResponse(data.prompt);
        console.log("AI Response: ",response);

        //jo answer aaya AI Se usse emit krr diya hai : wapas user ko 
        socket.emit("ai-message-response",{response})

        //also register karna hai lister postman pe (client)

    })





});

// yaha express ka server toh start hoga
// but also websocket bhi initialize hoga  
httpServer.listen(3000,()=>{
    console.log("Socket IO server started on port 3000")
});

