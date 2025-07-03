
import OpenAI from 'openai'
import dotenv from 'dotenv';
dotenv.config();



const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


export const generateFlashcard = async(req,res) =>{
    try{
        const {content} = req.body;
        const prompt = `Generate 5 flashcards in Q&A format based on following content:\n\n${content}\nEach flashcard should be short,clear and focus on key concept`;
        const response = await openai.chat.completions.create({
            model:'gpt-3.5-turbo',
            messages: [
                { role: 'user', content: prompt }
            ],

            temperature : 0.7,
        })
        const output = response.choices[0].message.content
        res.status(200).json({flashcard:output})
    }
    catch(error){
        console.error('OpenAi error',error.message)
        res.status(500).json({error:'Failed to generate flashcards'})
    }
}