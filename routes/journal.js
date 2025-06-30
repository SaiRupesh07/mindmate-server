const express = require('express');
const router = express.Router();
const JournalEntry = require('../models/JournalEntry');

// POST /api/journal
router.post('/', async (req, res) => {
  const { userId, mood, content } = req.body;
  try {
    const newEntry = new JournalEntry({ userId, mood, content });
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save entry' });
  }
});

// GET /api/journal/:userId
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const entries = await JournalEntry.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch journal entries' });
  }
});

module.exports = router;
