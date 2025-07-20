const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');

// Save or update habits
router.post('/save', async (req, res) => {
  try {
    const { userId, habits, streak } = req.body;
    let habitDoc = await Habit.findOne({ userId });
    if (habitDoc) {
      habitDoc.habits = habits;
      habitDoc.streak = streak;
    } else {
      habitDoc = new Habit({ userId, habits, streak });
    }
    await habitDoc.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error saving habits' });
  }
});

// Get habits
router.get('/:userId', async (req, res) => {
  try {
    const habitDoc = await Habit.findOne({ userId: req.params.userId });
    res.json(habitDoc || { habits: [], streak: 0 });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching habits' });
  }
});

module.exports = router;
