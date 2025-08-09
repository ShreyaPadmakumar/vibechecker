// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Allow larger image payloads

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function getSystemPrompt(mode) {
    return `You are the Vibe Checker 3000, an AI with a witty, slightly sarcastic personality.
    Analyze the user's photo and their chosen mode ("${mode}").
    Based on the image's colors, lighting, subject, and overall feeling, you must respond with ONLY a valid JSON object.
    Do not include any text, markdown formatting, or explanations before or after the JSON object. Just the raw JSON.
    The JSON object must have the following structure:
    {
      "vibeScore": <a number between 1 and 100>,
      "category": "<A short, creative, and funny title for the vibe. Examples: 'CEO of Crying in Public', 'Certified Pookie Energy', 'Quantum Uncertainty Personified'.>",
      "roast": "<A witty, one or two-sentence analysis that matches the selected mode. If the mode is 'compliment', this should be a genuine compliment. If it's 'extreme', be ruthless. If 'chaos', be weird and surreal.>",
      "pookieLevel": <a number between 0 and 100, representing cuteness/wholesomeness>,
      "cringeFactor": <a number between 0 and 100, representing awkwardness>,
      "sassLevel": <a number between 0 and 100, representing attitude/boldness>,
      "ghostEnergy": <a number between 0 and 100, representing tiredness or mysteriousness>
    }

    The values should be based on your analysis of the image. For example, a dark, low-energy photo should have high 'ghostEnergy' and a low 'vibeScore'. A bright, smiling photo should have high 'pookieLevel'. A bold, high-contrast photo might have high 'sassLevel'.
    The chosen mode is '${mode}'. Tailor the tone of the 'category' and 'roast' to this mode.
    `;
}

app.post('/analyze', async (req, res) => {
    try {
        const { image, mode } = req.body;
        if (!image || !mode) {
            return res.status(400).json({ error: 'Image data and mode are required.' });
        }

        // ---------- THIS IS THE IMPORTANT, CORRECTED LINE ----------
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' }); 
        // -----------------------------------------------------------

        const prompt = getSystemPrompt(mode);
        
        const imagePart = {
            inlineData: {
                data: image.split(',')[1],
                mimeType: image.match(/:(.*?);/)[1]
            },
        };

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        let text = response.text();

        // Clean up the response to ensure it's valid JSON
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const analysis = JSON.parse(text);
        res.json(analysis);

    } catch (error) {
        console.error('Error with Gemini API:', error);
        const errorMessage = error.message || 'An unknown error occurred.';
        res.status(500).json({ error: `AI Error: ${errorMessage}` });
    }
});

app.listen(port, () => {
    console.log(`Vibe Checker 3000 server running on http://localhost:${port}`);
});