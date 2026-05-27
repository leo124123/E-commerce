const express = require('express');
const router = express.Router();

const Product = require('../models/Product');


// GET ALL PRODUCTS
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);

  } catch (err) {

    res.status(500).json({
      message: 'Server Error',
    });

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