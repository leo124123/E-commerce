const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

const assetsDir = path.join(__dirname, '..', 'frontend', 'src', 'assets', 'Product img');
if (!fs.existsSync(assetsDir)) {
  console.error('Assets folder not found:', assetsDir);
  process.exit(1);
}
const files = fs.readdirSync(assetsDir).filter(f => !f.startsWith('.'));
const assetSet = new Set(files);
console.log('Found asset files:', files.length);

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce';
(async () => {
  let client;
  try {
    client = await MongoClient.connect(mongoUri, { useUnifiedTopology: true });
    const db = client.db();
    const products = await db.collection('products').find({}, { projection: { images: 1, colors: 1 } }).toArray();
    console.log('Products inspected:', products.length);
    let missingCount = 0;
    const missingExamples = [];
    products.forEach((p, idx) => {
      const imgs = p.images || [];
      const missing = imgs.filter(i => !assetSet.has(i));
      const missingColorImgs = (p.colors || []).map(c => c.image).filter(Boolean).filter(i => !assetSet.has(i));
      if (missing.length || missingColorImgs.length) {
        missingCount++;
        if (missingExamples.length < 10) {
          missingExamples.push({ productId: p._id, missing, missingColorImgs });
        }
      }
    });
    console.log('Products with missing images:', missingCount);
    if (missingExamples.length) {
      console.log('Examples of missing images:');
      console.dir(missingExamples, { depth: 4 });
    }
  } catch (err) {
    console.error('Error connecting to DB:', err.message);
    process.exitCode = 2;
  } finally {
    if (client) await client.close();
  }
})();
