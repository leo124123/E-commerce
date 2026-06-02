const mongoose = require('mongoose');
const dns = require('dns');

const connectDB = async (uri) => {
  const mongoURI = uri || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecommerce';

  // If using SRV connection string, ensure Node can resolve SRV records reliably
  if (typeof mongoURI === 'string' && mongoURI.startsWith('mongodb+srv://')) {
    try {
      dns.setServers(['8.8.8.8', '1.1.1.1']);
    } catch (e) {
      // ignore if DNS settings cannot be applied in the environment
    }
  }
  try {
    await mongoose.connect(mongoURI, { dbName: process.env.MONGODB_DATABASE || undefined });
    console.log('MongoDB connected:', mongoURI);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    throw err;
  }
};

module.exports = connectDB;
