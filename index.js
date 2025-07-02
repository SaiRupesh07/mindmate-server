// index.js
const express  = require('express');
const mongoose = require('mongoose');
const dotenv   = require('dotenv');
const cors     = require('cors');

const journalRoutes = require('./routes/journal');

// ▸ 1. Load .env
dotenv.config();

const app = express();

// ▸ 2. Global middleware
app.use(cors());          // Allow frontend origin
app.use(express.json());  // Parse JSON bodies

// ▸ 3. Health‑check route
app.get('/', (_req, res) => {
  res.send('🧠 MindMate backend is running!');
});

// ▸ 4. API routes
app.use('/api/journal', journalRoutes);

// ▸ 5. DB connection then start server
const PORT = process.env.PORT || 5000;      // ← Render provides PORT

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Crash so Render shows failure
  });
