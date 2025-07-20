const mongoose = require('mongoose');

const studyTaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  duration: { type: Number, default: 30 },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  completed: { type: Boolean, default: false },
  dueDate: { type: Date, required: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('StudyTask', studyTaskSchema);
