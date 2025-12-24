import "dotenv/config"
import http  from "http";
import { app } from "./src/app.js";
import { connectDB } from "./src/db/db.js";

import { initSocketServer } from "./src/sockets/socket.server.js";


const httpServer = http.createServer(app);

initSocketServer(httpServer);

connectDB()

//server start krr diya 
httpServer.listen(8000,()=>{
    console.log("Server started on port 8000 ");
})