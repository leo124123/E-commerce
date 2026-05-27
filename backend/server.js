require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

mongooseSetStrictQueryFalse = () => {
  try {
    const mongoose = require('mongoose');
    mongoose.set('strictQuery', false);
  } catch (e) {
    // ignore
  }
};
mongooseSetStrictQueryFalse();

// connect to DB
connectDB(process.env.MONGODB_URI).catch((err) => {
  console.error('Failed to connect to DB at startup:', err.message);
});

// routes
app.use('/api/auth', authRoutes);

// health
app.get('/health', (req, res) => res.json({ ok: true }));

// basic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));