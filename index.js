const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const journalRoutes = require('./routes/journal');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/journal', journalRoutes);  // ✅ Route setup

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => {
      console.log('🚀 Server running on port 5000');
    });
  })
  .catch((err) => {
    console.error('❌ DB connection error:', err);
  });
