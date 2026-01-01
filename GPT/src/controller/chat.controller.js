import { chatModel } from "../models/chat.model.js";

export async function createChat(req, res) {
    const { title } = req.body;
    const user = req.user;

    const chat = await chatModel.create({
        //konse user ki chat hai  
        user: user._id,
        //chat title kya hai 
        title
    });

    res.status(201).json({
        message: "Chat created successfully",
        chat: {
            _id: chat._id,
            title: chat.title,
            lastActivity: chat.lastActivity,
            //konse user ne chat create ki hai 
            user: chat.user
        }
    });
}