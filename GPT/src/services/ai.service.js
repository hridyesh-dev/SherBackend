import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function generateResponse(content){
    
    const response = await ai.models.generateContent({
        model:"gemini-2.0-flash",
        contents : content
    })
    return response.text
}  

export async function generateVector(content) {
    const response = await ai.models.embedContent({
        model : "gemini-embedding-001",
        contents : content,
        config:{
            outputDimensionality:768
            //by default this will generate : 3072
        }
    }) 
    return response.embeddings
}