import express from 'express'
import cors from 'cors'

export const app = express()

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5174'
app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }))

app.get("/", (req, res) => {
    res.send('Hello World! ')
})