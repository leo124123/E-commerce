const mongoose = require('mongoose');
const Product = require('./models/Product');

const uri = 'mongodb://127.0.0.1:27017/ecommerce';

(async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const count = await Product.countDocuments();
    const sample = await Product.findOne().lean();
    console.log('count', count);
    console.log('sample', sample ? {
      title: sample.title,
      images: sample.images,
      colors: sample.colors,
      category: sample.category,
      price: sample.price,
    } : null);
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
})();