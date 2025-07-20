const axios = require('axios');
const Message = require('../models/Message');
require('dotenv').config();

exports.chatWithGemini = async (req, res) => {
  try {
    const { text } = req.body;

    // Save user message
    const userMessage = new Message({ text, isUser: true });
    await userMessage.save();

    // Gemini Pro API call
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: text }]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const aiText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || '🤖 No response from Gemini';

    // Save AI response
    const botMessage = new Message({ text: aiText, isUser: false });
    await botMessage.save();

    res.json({ text: aiText });

  } catch (err) {
    console.error('❌ Gemini API error:', err.response?.data || err.message);
    res.status(500).json({
      error: err.response?.data?.error?.message || 'Gemini API failed.'
    });
  }
};
