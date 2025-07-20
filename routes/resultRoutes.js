const express = require('express');
const router = express.Router();
const QuizResult = require('../models/QuizResult');

// Save result
router.post('/save', async (req, res) => {
  const { userId, topic, score, total } = req.body;

  if (!userId || !topic || score === undefined || total === undefined) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const result = new QuizResult({ userId, topic, score, total });
    await result.save();
    res.status(201).json({ message: 'Result saved', result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get history by userId
router.get('/history/:userId', async (req, res) => {
  try {
    const history = await QuizResult.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
