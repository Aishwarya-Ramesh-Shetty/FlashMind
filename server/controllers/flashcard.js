import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const generateFlashcard = async (req, res) => {
  const { content } = req.body;

  if (!content || typeof content !== 'string' || content.length < 10) {
    return res.status(400).json({ error: 'Content is required and must be meaningful.' });
  }

  try {
    const prompt = `
Generate 5 flashcards in the following format:
Q: <question>
A: <answer>

Only follow this format strictly.

Content:
${content}
`;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [{ role: "user", content: prompt }],
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

    // ✅ Get the text output from the AI response
    const output = response.data.choices?.[0]?.message?.content || '';
    console.log("AI Output:", output); // ✅ NOW it's safe to log

    // ✅ Parse Q&A pairs
    const lines = output.split('\n').map(line => line.trim()).filter(Boolean);
    const flashcards = [];

    for (let i = 0; i < lines.length - 1; i++) {
      if (lines[i].startsWith('Q:') && lines[i + 1].startsWith('A:')) {
        flashcards.push({
          question: lines[i].replace('Q:', '').trim(),
          answer: lines[i + 1].replace('A:', '').trim()
        });
        i++; // skip the answer line next loop
      }
    }

    res.status(200).json({ flashcards });

  } catch (err) {
    console.error('OpenRouter Error:', err?.response?.data || err.message);
    res.status(500).json({ error: 'Failed to generate flashcards' });
  }
};
