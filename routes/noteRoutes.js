const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

// Define the route for summarizing notes
router.post('/summarize', noteController.summarizeNotes);

module.exports = router;
