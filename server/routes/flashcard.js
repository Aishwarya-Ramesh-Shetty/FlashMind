import express from 'express'
import { generateFlashcard } from '../controllers/flashcard.js'


const router = express.Router()

router.post('/generate',generateFlashcard)

export default router;