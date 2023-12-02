
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3004;
const clientRoutes = require('../routes/clientRoutes');

app.use(bodyParser.json());

app.use('/clients', clientRoutes);

app.listen(PORT, () => {
  console.log(`Client-Service running on port ${PORT}`);
});

module.exports = app;