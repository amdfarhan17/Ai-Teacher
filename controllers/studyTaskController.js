const StudyTask = require('../models/StudyTask');

// Create task
exports.createTask = async (req, res) => {
  try {
    const task = new StudyTask(req.body);
    const saved = await task.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task.' });
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await StudyTask.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks.' });
  }
};

// Update task (toggle complete or edit)
exports.updateTask = async (req, res) => {
  try {
    const task = await StudyTask.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task.' });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    await StudyTask.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task.' });
  }
};
