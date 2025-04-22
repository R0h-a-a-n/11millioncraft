const mongoose = require('mongoose');

const deletionRequestSchema = new mongoose.Schema({
  skuId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SKU',
    required: true
  },
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  reason: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  respondedAt: Date
});

module.exports = mongoose.model('DeletionRequest', deletionRequestSchema);