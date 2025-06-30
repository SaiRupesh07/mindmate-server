const mongoose = require('mongoose');

const JournalSchema = new mongoose.Schema({
  userId: String,
  mood: String,
  content: String,
  sentimentScore: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JournalEntry', JournalSchema);
