require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const productRoutes = require('./routes/products');

const app = express();


// ✅ CORS FIX (frontend en Vite)
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());


// routes
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/products', productRoutes);


// health check
app.get('/health', (req, res) => {
  res.json({ ok: true });
});


// mongoose fix warning
mongoose.set('strictQuery', false);


// DB connection
connectDB(process.env.MONGODB_URI).catch((err) => {
  console.error('Failed to connect to DB at startup:', err.message);
});


// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});


// start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});