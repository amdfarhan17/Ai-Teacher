const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Analytics = require('../models/Analytics');

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Week Data
    await Analytics.create({
      userId: '6872799e5d4fffebb84bcbbc',
      timeRange: 'week',
      performanceData: {
        studyHours: [2, 3, 4, 2, 5, 3, 4],
        quizScores: [85, 92, 78, 88, 95, 82, 90],
        subjects: ['Math', 'Physics', 'Chemistry', 'Biology', 'History'],
        subjectProgress: [85, 78, 92, 67, 88]
      }
    });

    // Month Data
    await Analytics.create({
      userId: '6872799e5d4fffebb84bcbbc',
      timeRange: 'month',
      performanceData: {
        studyHours: [45, 52, 38, 61],
        quizScores: [82, 87, 91, 89],
        subjects: ['Math', 'Physics', 'Chemistry', 'Biology', 'History'],
        subjectProgress: [88, 82, 94, 71, 85]
      }
    });

    console.log('✅ Weekly and Monthly analytics seeded successfully');
    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Seeding error:', err.message);
  }
};

seed();
