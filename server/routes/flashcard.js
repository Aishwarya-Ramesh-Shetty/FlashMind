import express from 'express'
import { generateFlashcard } from '../controllers/flashcard.js'


const router = express.Router()

router.post('/generate',generateFlashcard)
router.get('/test', (req, res) => {
  res.send('Flashcard route is working!');
});


export default router;