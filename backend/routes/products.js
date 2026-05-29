const express = require('express');
const router = express.Router();

const Product = require('../models/Product');

const LOCAL_IMAGES = [
  'imgi_100_6cada0594dfb5ed20bd9a06583caeb53d316269f-2000x1125.jpg',
  'imgi_146_4bb288a9984112ca630219adfd934de9565d3af0-1536x1536.jpg',
  'imgi_150_6bdda650cf7efc239bfe7d0dff0310f14c068247-1536x1536.jpg',
  'imgi_153_7f55a8b187920aceb5a03b3e0d9bc5a18d3a878d-1536x1536.jpg',
  "imgi_32_FUTURE-9-ULTIMATE-Men's-Firm-Ground-Soccer-Cleats.jpg",
  "imgi_33_ULTRA-6-ULTIMATE-Men's-Firm-Ground-Soccer-Cleats.jpg",
  "imgi_34_FUTURE-9-ULTIMATE-Women's-Firm-Ground-Soccer-Cleats.jpg",
  'imgi_35_Artificial-Ground-Soccer-Cleats.jpg',
  "imgi_36_ULTRA-6-PRO-Men's-Firm-Ground-Soccer-Cleats.jpg",
  'imgi_37_Artificial-Ground-Soccer-Cleats.jpg',
  'imgi_38_Artificial-Ground-Soccer-Cleats.jpg',
  'imgi_47_22d29b2d0a2943cbddd8f6de4c4335cdfa69f8c2.jpg',
  'imgi_48_6d20d632367eb527c58aeee491ca51da7c5370c6.jpg',
  'imgi_54_50c58f6ae51841c54033605d452f2377f5e3290c.jpg',
  'imgi_56_7630db7f28fa25f5eb07497e7cf510bb432f4357.jpg',
  'imgi_58_baaf79570547b639800b41e4bd1b16638b1f4a64.jpg',
];

const productSeedTemplates = [
  {
    title: 'Puma Court Pro',
    description: 'Diseñado para mantener control en cada partido de tenis.',
    category: 'Tennis',
    search: 'puma tennis shoe',
    price: 129,
    brand: 'Puma',
  },
  {
    title: 'Puma Drift Basket',
    description: 'Perfecto para cancha y estilo urbano deportivo.',
    category: 'Basketball',
    search: 'puma basketball sneaker',
    price: 145,
    brand: 'Puma',
  },
  {
    title: 'Puma Speed Racer',
    description: 'Ligero para carreras cortas y entrenamiento intenso.',
    category: 'Running',
    search: 'puma running shoe',
    price: 139,
    brand: 'Puma',
  },
  {
    title: 'Puma Street Ace',
    description: 'Estilo premium para la ciudad con confort deportivo.',
    category: 'Street',
    search: 'puma lifestyle sneaker',
    price: 119,
    brand: 'Puma',
  },
  {
    title: 'Puma Court Legends',
    description: 'Toque moderno para jugadores que buscan estabilidad.',
    category: 'Tennis',
    search: 'puma tennis court shoe',
    price: 149,
    brand: 'Puma',
  },
  {
    title: 'Puma Pro Flight',
    description: 'Máximo soporte en salto y aterrizaje.',
    category: 'Basketball',
    search: 'puma basketball court shoe',
    price: 155,
    brand: 'Puma',
  },
];

function buildImageSet(index) {
  return Array.from({ length: 3 }, (_, offset) => {
    return LOCAL_IMAGES[(index * 3 + offset) % LOCAL_IMAGES.length];
  });
}

function buildSeedProducts(count = 35) {
  return Array.from({ length: count }, (_, index) => {
    const template = productSeedTemplates[index % productSeedTemplates.length];
    const imageSet = buildImageSet(index);
    const colorOptions = [
      { name: 'Blanco', value: '#FFFFFF', image: imageSet[0] },
      { name: 'Negro', value: '#111111', image: imageSet[1] },
      { name: 'Rojo', value: '#D62828', image: imageSet[2] },
    ];

    const sizes = [38, 39, 40, 41, 42, 43, 44];

    return {
      title: `${template.title} ${index + 1}`,
      description: template.description,
      brand: template.brand,
      category: template.category,
      price: template.price + ((index + 1) % 5) * 5,
      stock: 25 + ((index + 1) % 10),
      images: imageSet,
      colors: colorOptions,
      sizes,
      featured: index < 10,
    };
  });
}

// GET ALL PRODUCTS
router.get('/', async (req, res) => {
  try {
    let products = await Product.find();

    if (!products.length) {
      const seedProducts = buildSeedProducts(35);
      products = await Product.insertMany(seedProducts);
    }

    res.json(products);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Server Error',
    });
  }
});

router.post('/seed-external', async (req, res) => {
  try {
    const force = req.query.force === 'true' || req.body.force === true
    const existingCount = await Product.countDocuments();

    if (existingCount >= 35 && !force) {
      return res.status(200).json({ message: 'Ya existen suficientes productos en la base de datos.', count: existingCount });
    }

    if (force) {
      await Product.deleteMany({})
    }

    const seedProducts = buildSeedProducts(35);
    const created = await Product.insertMany(seedProducts);

    return res.status(201).json({ message: 'Productos generados con imágenes externas.', created: created.length });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});


// GET SINGLE PRODUCT
router.get('/:id', async (req, res) => {
  try {

    const product = await Product.findById(
      req.params.id
    );

    res.json(product);

  } catch (err) {

    res.status(500).json({
      message: 'Server Error',
    });

  }
});


// CREATE PRODUCT
router.post('/', async (req, res) => {
  try {

    const product = await Product.create(req.body);

    res.status(201).json(product);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: 'Server Error',
    });

  }
});

module.exports = router;