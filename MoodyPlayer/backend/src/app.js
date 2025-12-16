import express from 'express';
import { router as songroute } from './routes/song.routes.js'; 
import cors from "cors"

const app = express();

app.use(cors())

app.use(express.json());
app.use('/', songroute); 

export default app;