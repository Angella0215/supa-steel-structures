const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    specialRequests: {
      type: String, // e.g. custom measurements, color, etc.
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Ready for Collection', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    estimatedCompletion: {
      type: String, // e.g. "Ready in 8 working days"
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);