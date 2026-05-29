const express = require('express');
const router = express.Router();

const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

async function getCartForUser(userId) {
  let cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
    await cart.save();
    cart = await Cart.findById(cart._id).populate('items.product');
  }
  return cart;
}

router.get('/', auth, async (req, res) => {
  try {
    const cart = await getCartForUser(req.user.id);
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity = 1, color, size } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    const existingItem = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.color === color &&
        String(item.size) === String(size)
    );

    if (existingItem) {
      existingItem.quantity += Number(quantity) || 1;
    } else {
      cart.items.push({
        product: productId,
        quantity: Number(quantity) || 1,
        color,
        size,
      });
    }

    await cart.save();
    const savedCart = await Cart.findById(cart._id).populate('items.product');
    res.json(savedCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/item/:itemId', auth, async (req, res) => {
  try {
    const { quantity, color, size } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: 'Cart item not found' });

    if (quantity != null) item.quantity = Math.max(1, Number(quantity) || 1);
    if (color != null) item.color = color;
    if (size != null) item.size = size;

    await cart.save();
    const updatedCart = await Cart.findById(cart._id).populate('items.product');
    res.json(updatedCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.delete('/item/:itemId', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(
      (item) => item._id.toString() !== req.params.itemId
    );

    await cart.save();
    const updatedCart = await Cart.findById(cart._id).populate('items.product');
    res.json(updatedCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
