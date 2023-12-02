// accountModel.js
const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  accountNumber: { type: String, required: true, unique: true },
  accountType: { type: String, enum: ['Savings', 'Checking'], required: true },
  balance: { type: Number, default: 0 },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
