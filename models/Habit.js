const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
  userId: String,
  habits: [
    {
      name: String,
      done: Boolean
    }
  ],
  streak: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Habit', HabitSchema);
