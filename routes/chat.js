const express = require('express');
const { OpenAI } = require('openai');
const router = express.Router();
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    // ✅ Debug: Check if message exists
    if (!message || typeof message !== 'string') {
      console.log("❌ Invalid or missing 'message' in request body:", req.body);
      return res.status(400).json({ error: "Missing or invalid 'message' field in request body" });
    }

    console.log("🔥 Chat API received:", message);

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful mental health assistant.' },
        { role: 'user', content: message },
      ],
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });

  } catch (err) {
    console.error('❌ OpenAI error:', err);
    res.status(500).json({ error: 'OpenAI API error' });
  }
});

module.exports = router;
