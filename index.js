const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const journalRoutes = require('./routes/journal');
const cors = require('cors');

dotenv.config();
const app = express();

// ✅ Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// ✅ Root route for health check or welcome message
app.get('/', (req, res) => {
  res.send('🚀 MindMate Backend is live and running!');
});

// ✅ Journal routes
app.use('/api/journal', journalRoutes);

// ✅ Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => {
      console.log('🚀 Server running on port 5000');
    });
  })
  .catch((err) => {
    console.error('❌ DB connection error:', err);
  });
