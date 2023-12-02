// clientModel.js
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  address: {
    street: { type: String },
    city: { type: String },
    zipCode: { type: String },
    country: { type: String },
  },
  accounts: [
    [{ type:  mongoose.Schema.Types.ObjectId, ref: 'Account' }]
  ],
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
