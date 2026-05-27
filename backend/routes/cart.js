const express = require('express');
const router = express.Router();

const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    }).populate('items.product');

    res.json(cart);
  } catch (err) {
    res.status(500).json({
      message: 'Server Error',
    });
  }
});

router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity, color, size } =
      req.body;

    let cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        items: [],
      });
    }

    cart.items.push({
      product: productId,
      quantity,
      color,
      size,
    });

    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({
      message: 'Server Error',
    });
  }
});

module.exports = router;