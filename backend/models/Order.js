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
      required: false,           // no longer required
    },
    productName: {               // new field for custom requests
      type: String,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    specialRequests: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Ready for Collection', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    estimatedCompletion: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);