const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const journalRoutes = require('./routes/journal');
const cors = require('cors');

// ✅ Load environment variables
dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Health check root route
app.get('/', (req, res) => {
  res.send('🧠 MindMate backend is running!');
});

// ✅ Routes
app.use('/api/journal', journalRoutes);

// ✅ MongoDB Connection and Server Start
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(5000, () => {
      console.log('🚀 Server running on port 5000');
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // 💥 Crash the app if DB fails to connect
  });
