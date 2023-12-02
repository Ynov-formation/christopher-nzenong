
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

module.exports = {
    jwtSecret: process.env.JWTPRIVATEKEY,
    jwtExpiration: '1h', // Durée de validité du token JWT
  };
  