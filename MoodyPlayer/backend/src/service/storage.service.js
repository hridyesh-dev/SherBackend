//3RD PARTY SERVICE KE LIYE IN SERVICES FOLDER 
import ImageKit from "imagekit";
import mongoose from 'mongoose'

//image kit setup 
var imagekit=new ImageKit({
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT
})

console.log("ImageKit ENV:", {
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

// our main function will fetch our file and will upload to imagekit 
// YEH JO FUNCTION hai yeh seedha home mai jaa raha tha i want ki yeh ek folder mai ho 

export function uploadFile(file){

    //yaha we cant use async await due to the callback function 
    return new Promise((resolve,reject)=>{
        //humm yaha pr ek file ko upload karne jaa rahe hai 
        // file ----> our server -----> image server
        imagekit.upload({
            
            file:file.buffer,
            
            // mongoose ke through object id generate karege
            // fileName:Math.random().toString(36).substring(10)
            fileName : new mongoose.Types.ObjectId().toString() ,
            
            //apne audio files ko ek folder mai daal do , structured approach 
            folder : "cohort-audio"
        },(error,result)=>{
            if(error){
                reject(error);
            }else{
                resolve(result);
            }
        })
    });
 
}