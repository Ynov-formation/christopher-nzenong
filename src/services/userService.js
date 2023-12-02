
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3003;
const userRoutes = require('../routes/userRoutes');

app.use(bodyParser.json());

app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`User-Service running on port ${PORT}`);
});

module.exports = app;