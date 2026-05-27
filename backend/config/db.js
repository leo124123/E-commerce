const mongoose = require('mongoose');

const connectDB = async (uri) => {
  const mongoURI = uri || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecommerce';
  try {
    await mongoose.connect(mongoURI, { dbName: process.env.MONGODB_DATABASE || undefined });
    console.log('MongoDB connected:', mongoURI);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    throw err;
  }
};

module.exports = connectDB;
