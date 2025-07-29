import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import authRoutes from "./routes/auth.js"

import flashcardRoutes from './routes/flashcard.js'

const app = express()
app.use(cors())
app.use(express.json({ limit: "1mb" }))


app.get('/', (req, res) => {
  res.send('FlashMind backend is live!');
});

app.use('/api/auth',authRoutes);


app.use('/api/flashcard',flashcardRoutes)

const PORT = process.env.PORT || 5000;



mongoose
    .connect(
        process.env.MONGO_URI
    )
    .then(() =>{
        console.log("Mongodb connected")
        app.listen(PORT,() => console.log(`Server running on ${PORT}`))
    })
    .catch((err) => console.error('Mongodb error',err))


process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
