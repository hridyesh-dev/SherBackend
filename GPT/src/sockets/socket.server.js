import { Server } from "socket.io";
import cookie from "cookie"
import jwt from "jsonwebtoken"
import { userModel } from "../models/user.model.js";

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
            
            const user= await userModel.findById(decoded.id)

            // JO BHI USER AAYE GA USSE SET KRR DO 
            socket.user = user ;
            next()

        }catch(error){
            next(new Error("Authentication error : invalid Token "))
        }
        
    })

    io.on("connection",(socket)=>{
        console.log("New Socket Connection ",socket.id);
    })

}

/*
- Extracting the JWT token from cookies during the WebSocket handshake.
- Verifying the token to authenticate the user.
- Attaching the authenticated user to the socket object.
- Allowing only verified users to establish a socket connection


*/