const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Desk', 'Gate', 'Door', 'Table', 'Bed', 'Trolley', 'Other'],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    timeframe: {
      type: String,
      required: true, // e.g. "7-10 working days"
    },
    images: [
      {
        type: String, // will store Cloudinary URLs later
      },
    ],
    autoCADDrawing: {
      type: String, // URL to the AutoCAD / drawing file
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);