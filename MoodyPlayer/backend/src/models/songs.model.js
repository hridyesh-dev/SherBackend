// jo songs upload karne waale hai uske data ko store karna padega
// and uske liye humne ek model create karna hai
import mongoose from "mongoose";

const songSchema = new mongoose.Schema({

    // name of song
    title: { type: String, required: true },
    
    // name of artist
    artist: { type: String, required: true },

    // name of song
    mood: { type: String, required: true },
    
    // song url
    audio: { type: String, required: true }

});

// Capitalize model name and export it properly
export const song = mongoose.model('song', songSchema);