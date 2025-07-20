const express = require('express');
const router = express.Router();
const QuizQuestion = require('../models/QuizQuestion');

// Get 5 questions by topic (case-insensitive)
router.get('/questions', async (req, res) => {
  const topic = req.query.topic?.toLowerCase();
  if (!topic) return res.status(400).json({ message: 'Topic is required' });

  try {
    const questions = await QuizQuestion.find({ topic }).limit(5);
    if (questions.length === 0) {
      return res.status(404).json({ message: 'No questions found for this topic.' });
    }
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
