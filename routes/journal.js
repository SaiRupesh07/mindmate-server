const express = require('express');
const router = express.Router();
const JournalEntry = require('../models/JournalEntry');

// ✅ Health check route
router.get('/', (req, res) => {
  console.log('✅ GET /api/journal - Health check hit');
  res.json({ message: '✅ Journal API is live!' });
});

// ✅ POST /api/journal
router.post('/', async (req, res) => {
  console.log('📥 POST /api/journal');
  console.log('🧠 Request body:', req.body);

  const { userId, mood, content } = req.body;

  if (!userId || !mood || !content) {
    console.warn('⚠️ Missing required fields');
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newEntry = new JournalEntry({ userId, mood, content });
    const savedEntry = await newEntry.save();

    console.log(`✅ Journal saved for userId: ${userId}`);
    res.status(201).json(savedEntry);
  } catch (err) {
    console.error('❌ Error saving journal entry:', err.message);
    res.status(500).json({ error: 'Failed to save entry' });
  }
});

// ✅ GET /api/journal/:userId
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  console.log(`📥 GET /api/journal/${userId} - Fetching entries`);

  try {
    const entries = await JournalEntry.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(entries);
  } catch (err) {
    console.error('❌ Error fetching journal entries:', err.message);
    res.status(500).json({ error: 'Failed to fetch journal entries' });
  }
});

module.exports = router;
