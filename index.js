const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load .env variables
dotenv.config();
console.log("✅ Loaded GROQ API KEY:", process.env.GROQ_API_KEY);

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const journalRoutes = require('./routes/journal');
const groqChatRoutes = require('./routes/groqChat'); // ✅ Ensure this exists

// Health check route
app.get('/', (_req, res) => {
  res.send('🧠 MindMate backend is running with Groq!');
});

// Mount API routes
app.use('/api/journal', journalRoutes);
app.use('/api/groq-chat', groqChatRoutes); // ✅ Groq Chatbot API

// MongoDB connection + server start
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
