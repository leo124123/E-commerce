const express = require('express');
const Stripe = require('stripe');
const router = express.Router();
const auth = require('../middleware/auth');
const Cart = require('../models/Cart');

const stripeKey = process.env.STRIPE_SECRET_KEY;
if (!stripeKey) {
  throw new Error('STRIPE_SECRET_KEY is required in backend environment');
}
const stripe = Stripe(stripeKey);

async function getCartForUser(userId) {
  let cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
    await cart.save();
    cart = await Cart.findById(cart._id).populate('items.product');
  }
  return cart;
}

router.post('/create-payment-intent', auth, async (req, res) => {
  try {
    const cart = await getCartForUser(req.user.id);
    if (!cart.items.length) {
      return res.status(400).json({ message: 'El carrito está vacío' });
    }

    const amount = cart.items.reduce((sum, item) => {
      return sum + ((item.product?.price || 0) * item.quantity);
    }, 0);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: {
        cartId: cart._id.toString(),
        userId: req.user.id,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      amount,
      currency: 'USD',
    });
  } catch (err) {
    console.error('Stripe create-payment-intent error:', err);
    res.status(500).json({ message: 'Error creando el pago' });
  }
});

module.exports = router;
