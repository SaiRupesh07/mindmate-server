const express  = require('express');
const mongoose = require('mongoose');
const dotenv   = require('dotenv');
const cors     = require('cors');

// ▸ 1. Load .env
dotenv.config();

// ▸ 2. Initialize app
const app = express();

// ▸ 3. Global middleware
app.use(cors());         
app.use(express.json());  

// ▸ 4. Import routes
const journalRoutes = require('./routes/journal');
const chatRoutes    = require('./routes/chat');

// ▸ 5. Health-check route
app.get('/', (_req, res) => {
  res.send('🧠 MindMate backend is running!');
});

// ▸ 6. API routes
app.use('/api/journal', journalRoutes);
app.use('/api/chat',    chatRoutes);   // ✅ safe now

// ▸ 7. DB connection then start server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
