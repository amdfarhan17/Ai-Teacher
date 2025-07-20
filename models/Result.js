const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  topic: String,
  score: Number,
}, { timestamps: true });

module.exports = mongoose.model('Result', resultSchema);
