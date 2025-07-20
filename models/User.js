const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  quizHistory: [
    {
      subject: String,
      score: Number,
      date: { type: Date, default: Date.now }
    }
  ],
  tutorChats: [
    {
      question: String,
      answer: String,
      timestamp: { type: Date, default: Date.now }
    }
  ],
  notes: [
    {
      title: String,
      summary: String,
      date: { type: Date, default: Date.now }
    }
  ],
  plannerTasks: [
    {
      title: String,
      subject: String,
      dueDate: String,
      priority: String,
      duration: String,
      dateCreated: { type: Date, default: Date.now }
    }
  ],
  voiceInteractions: [
    {
      command: String,
      response: String,
      date: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
