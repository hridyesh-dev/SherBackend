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

//short term memory create krr di hai 
const chatHistory=[]

//yehi pura socket io ka main code hai  
//jab server se ek naya connect ho tabh yeh event chalega and callback call hoga
/*
io.on("connection", (socket ) => {
    console.log("A user connected ");

    socket.on("disconnect",()=>{
        console.log("A user disconnected ");
    })

    //event ko register kiya hai : jab bhi message event chalega tabh yeh callback chalega 
    // on : Listener , emit : emit fire karna  
    socket.on("ai-message", async (data)=>{
        
        console.log("received ai message : ",data.prompt );
        
        //history mai push karo 
        chatHistory.push({
            role:"user",
            parts:[{ text : data }]
        })

        const response = await generateResponse(chatHistory);
        console.log("AI Response ",response);
        
        chatHistory.push({
            role:"model",
            parts:[{ text : data }]
        })

        //MAKING IT A TWO WAY COMMUNICATION 
        //server ne apni side se event fire kiya 
        //server se even emit kiya
        socket.emit("ai-message-response",{response})
    
    })

}); 
*/
io.on('connection', (socket ) => {
    socket.on("ai-message", async (data) => {
        try {
            //Use the prompt string, not the whole object
            const prompt = typeof data === 'string' ? data : data.prompt;
            chatHistory.push({
                role: "user",
                parts: [{ text: prompt }]
            });

            const response = await generateResponse(chatHistory);

            chatHistory.push({
                role: "model",
                parts: [{ text: response }]
            });

            socket.emit("ai-message-response", { response });
            } catch (err) {
            console.error("AI error", err);
            socket.emit("ai-message-response", { error: "AI failed to generate a response" });
            }
        });
});

httpServer.listen(3001,()=>{
    console.log("Server started on port 3001");
})

