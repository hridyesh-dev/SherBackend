
import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import "../components/facialExpression.css";
import axios from 'axios'

export default function FacialExpression({setSongs}) {
    const videoRef = useRef();

    const loadModels = async () => {
        const MODEL_URL = '/models';
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };

    const startVideo = () => {
        navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error('Error accessing webcam: ', err));
    };

    async function detectMood() {
    
        const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

        if (!detections || !detections[0]) {
        console.log("No face detected.");
        return;
        }

        let mostProbableExpression = 0;
        let _expression = '';

        //expression dhunda 
        for (const expression of Object.keys(detections[0].expressions)) {
        if (detections[0].expressions[expression] > mostProbableExpression) {
            mostProbableExpression = detections[0].expressions[expression];
            _expression = expression;
        }
        }
        //expression mill gaya 
        console.log(_expression);
        
        //jab mood detect ho gaya then request this api http://localhost:3000/songs?mood=Mood and give us the response 
        axios.get(`http://localhost:3000/songs?mood=${_expression}`).then(response=>{
            console.log(response.data);
            setSongs(response.data.songs)
        })
    }

    useEffect(() => {
        loadModels().then(startVideo);
    }, []);

    return (
        <div className='mood-element'>
        {/* Video with styled background wrapper */}
        <div className="video-wrapper">
            <div className="video-bg"></div>
            <video
            ref={videoRef}
            autoPlay
            muted
            className='user-video-feed'
            />
        </div>

        <div className='info-div'>
            <h1 className="headline">Live Mood Detection</h1>
            <p className="subtext">
            Your mood is being analyzed in real time.  
            Experience music curated to match your feelings.
            </p>
            <button onClick={detectMood}>Detect Mood</button>
        </div>
        </div>
    );
}
