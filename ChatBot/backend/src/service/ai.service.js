import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function generateResponse(chatHistory){
    
    const response=await ai.models.generateContent({
        model:"gemini-2.0-flash",
        contents:chatHistory
    })
    return response.text
}