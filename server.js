const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); // ✅ Needed to build correct paths

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Routes
const chatRoutes = require('./routes/chatRoutes');
const noteRoutes = require('./routes/noteRoutes');
const studyTaskRoutes = require('./routes/studyTaskRoutes');
const authRoutes = require('./routes/authRoutes');
const voiceAssistantRoutes = require('./routes/voiceAssistantRoutes');
const quizRoutes = require('./routes/quizRoutes');
const resultRoutes = require('./routes/resultRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');


// ✅ Use routes
app.use('/api/chat', chatRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/study-tasks', studyTaskRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/voice-assistant', voiceAssistantRoutes);
app.use('/api/quiz', quizRoutes); // Only once is enough
app.use('/api/result', resultRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/habits', require('./routes/habits'));



// ✅ MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err.message));

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
