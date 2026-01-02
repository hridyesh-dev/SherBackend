import { Server } from "socket.io";
import cookie from "cookie"
import jwt from "jsonwebtoken"
import { userModel } from "../models/user.model.js";
import { generateResponse } from "../services/ai.service.js";
import { messageModel } from "../models/message.model.js";

export  function initSocketServer(httpServer){
    //io = server 
    const io = new Server(httpServer,{})

    //socket io ka middleware 
    // Jab tak user loggedIn nahi hia tabh 
    // tak usse SocketIO se connect nahi karna chahiye
    io.use(async (socket,next)=>{
        //token set hai usse fetch karna hai 
        const cookies = cookie.parse(socket.handshake.headers?.cookie || "" )
        //jaise connection banega socket.io ka cookie milegi 
        console.log(" Socket connection cookies : ",cookies);
        if(!cookies.token){
            next(new Error("Auth error : no token provided"))
        }
        try{
            //token ko verify karo 
            const decoded = jwt.verify( cookies.token , process.env.JWT_SECRET )    
            //konse model ne connection request kari hai 
            //user ki id ke bases pe usko find karege 
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
            console.log(messagePayload);

            //jo user ne message kiya usee save karo 
            // aur jo response aaya hai usse bhi save karo 
            //jo user ne message kiya tha usse save krr do 
            // chat history mai user ka message save kiya 
            await messageModel.create({
                chat:messagePayload.chat,
                user:socket.user._id,
                content:messagePayload.content,
                role:"user"
            })


            //kitne last messages yaad rakhne waale hai : IN SHORT TERM MEMORY 
            //- Yeh MongoDB se saare messages fetch karta hai jo us chat ID (messagePayload.chat) ke andar hain.
            //- chatHistory ek array of objects hota hai, jisme har object ek message document hota hai:
            //  {
            //      role: "user" or "model",
            //      content: "actual message text",
            //      ...
            //   }
            //yehi hai hamari short term memory 
            //isko limit krr diya only sending 10 messages 
            const chatHistory = (await messageModel.find({
                chat:messagePayload.chat
            }).sort({createdAt:-1}).limit(10).lean()).reverse()

            //ai ko pura context bheja hai 
            const response = await generateResponse(chatHistory.map(item=>{
                return {
                    role:item.role,
                    parts:[{text:item.content }]
                }
            }))
        
            // Jo message model ne bheja hai usse bhi
            // Save krr do iss se chat history maintain ho jaaye gi 
            // model ka answer save kiya 
            await messageModel.create({
                chat:messagePayload.chat,
                user:socket.user._id,
                content:response,
                role:"model"
            })

            //sending response to client 
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

    AI gives us in the form of token : agar message length lambi > number of token increase > cost increases
*/
