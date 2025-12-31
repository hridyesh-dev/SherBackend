import { Server } from "socket.io";
import cookie from "cookie"
import jwt from "jsonwebtoken"
import { userModel } from "../models/user.model.js";
import { generateResponse } from "../services/ai.service.js";
import { messageModel } from "../models/message.model.js";

export  function initSocketServer(httpServer){
    const io = new Server(httpServer,{})

    //socket io ka middleware  
    io.use(async (socket,next)=>{
        //token set hai usse fetch karna hai 
        const cookies = cookie.parse(socket.handshake.headers?.cookie || "" )
        console.log(" Socket connection cookies : ",cookies);
        if(!cookies.token){
            next(new Error("Auth error : no token provided"))
        }
        try{
            const decoded=jwt.verify(cookies.token,process.env.JWT_SECRET)    
            //konse model ne connection request kari hai 
            const user= await userModel.findById(decoded.id)
            // JO BHI USER AAYE GA USSE SET KRR DO 
            socket.user = user ;
            next()
        }catch(error){
            next(new Error("Authentication error : invalid Token "))
        }  
    })

    io.on("connection",(socket)=>{
        //konsa user connect hua hai 
        console.log("user connected ",socket.user);
        //socket id built in feature hai 
        console.log("New Socket Connection ",socket.id);

        //ai message prr listener laga diya 
        socket.on("ai-message",async(messagePayload)=>{
            /*
                messagePayload{
                    chat:chatId,
                    content: message text content 
                }
                console.log("Message sent by user: ",messagePayload);
            */

            //jo user ne message kiya usee save karo 
            // aur jo response aaya hai usse bhi save karo 
            //jo user ne message kiya tha usse save krr do 
            await messageModel.create({
                chat:messagePayload.chat,
                user:socket.user._id,
                content:messagePayload.content,
                role:"user"
            })

            const chatHistory = await messageModel.find({
                chat:messagePayload.chatHistory
            })


            const response = await generateResponse(chatHistory.map(item=>{
                return {
                    role:item.role,
                    parts:[{text:item.content }]
                }
            }))
        
            // Jo message model ne bheja hai usse bhi
            // Save krr do iss se chat history maintain ho jaaye gi 
            await messageModel.create({
                chat:messagePayload.chat,
                user:socket.user._id,
                content:messagePayload.content,
                role:"model"
            })

            //event emitter: jo reponse aaye ga usse send krr diya wapas 
            socket.emit("ai-response",{
                content:response,
                chat : messagePayload.chat
            })

        })


    })
}

/*
    Extracting the JWT token from cookies during the WebSocket handshake.
    Verifying the token to authenticate the user.
    Attaching the authenticated user to the socket object.
    Allowing only verified users to establish a socket connection
*/
