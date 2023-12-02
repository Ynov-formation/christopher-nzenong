const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['Credit', 'Debit', 'Transfer'], required: true },
  amount: { type: Number, required: true },
  sourceAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  destinationAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  timestamp: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
