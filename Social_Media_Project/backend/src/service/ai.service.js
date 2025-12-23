/*
    types of genAi
    text to text , text to image , text to video , text to audio 
    image upload kare ----> caption mile 

    if image file in less <20mb wih prompt we can do inline method 
    or else we can use file API 


*/

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

//base 64 mai input dena caption mill jaaye gi 
export async function generateCaption(base64ImageFile){
    const contents = [
        {
            //image ko de rahe hai 
            inlineData: {
                mimeType: "image/jpeg",
                data: base64ImageFile,
            },
        },
        {  text: "caption this image. "},
    ];
    //giving image as input and returning the caption 
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config:{
            systemInstruction:`
                You are an expert in generating captions for images
                you generate single caption for the image.
                Your caption should be short and concise
                and You use hashtags and emojis in the caption
            `
        }
    });
    console.log(response);
    return response.text;
}
