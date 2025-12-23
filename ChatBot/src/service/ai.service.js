import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function generateResponse(prompt){
    
    const response=await ai.models.generateContent({
        model:"gemini-2.0-flash",
        contents:prompt
    })
    return response.text
}