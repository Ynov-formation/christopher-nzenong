const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require("express");
const app = express()
const cors = require("cors");
const PORT = process.env.PORT || 3000

// DATABASE

const connection = require('./config/db')

connection();

// MICRO - SERVICES

const apiGateway = require('./api/api-gateway')
const accountService = require('./services/accountService')
const authService = require('./services/authService')
const clientService = require('./services/clientService')
const transactionService = require('./services/transactionService')
const userService = require('./services/userService')

app.use(express.json())
app.use(cors)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });