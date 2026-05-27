const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      default: 'Puma',
    },

    category: {
      type: String,
      default: 'Sneakers',
    },

    price: {
      type: Number,
      required: true,
    },

    images: [
      {
        type: String,
      },
    ],

    colors: [
      {
        name: String,
        value: String,
        image: String,
      },
    ],

    sizes: [
      {
        type: Number,
      },
    ],

    stock: {
      type: Number,
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);