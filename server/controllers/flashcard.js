import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const generateFlashcard = async (req, res) => {
  const { content } = req.body;

  if (!content || typeof content !== 'string' || content.trim().length < 10) {
    return res.status(400).json({ error: 'Content is required and must be meaningful.' });
  }

  const prompt = `Generate 5 flashcards in Q&A format based on the content below:\n\n${content}`;
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 512,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'FlashMind',
        },
      }
    );

    console.log("FULL RESPONSE:", response.data);

    const output = response.data.choices?.[0]?.message?.content;
    console.log("AI Output:", output);

    // Parse flashcards (basic Q/A split)
    const lines = output.split('\n').map(l => l.trim()).filter(Boolean);
    const flashcards = [];
    for (let i = 0; i < lines.length - 1; i++) {
      if (lines[i].endsWith('?')) {
        flashcards.push({
          question: lines[i],
          answer: lines[i + 1] || 'N/A'
        });
        i++;
      }
    }

    console.log("Parsed flashcards:", flashcards);

    res.status(200).json({ flashcards });

  } catch (error) {
    console.error("OpenRouter Error:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate flashcards" });
  }
};
