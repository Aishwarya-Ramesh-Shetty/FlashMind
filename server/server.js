import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()


import flashcardRoutes from './routes/flashcard.js'


const app = express()


app.use(cors())
app.use(express.json())

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

    console.log('OpenAI Key:', process.env.OPENAI_API_KEY);
