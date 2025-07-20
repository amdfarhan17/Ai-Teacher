const mongoose = require('mongoose');

const quizQuestionSchema = new mongoose.Schema({
  topic: String,
  question: String,
  options: [String],
  correctAnswer: String,
  explanation: String,
});

module.exports = mongoose.model('QuizQuestion', quizQuestionSchema);
