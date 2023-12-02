const express = require('express');
const bodyParser = require('body-parser');
const accountRoutes = require('../routes/accountRoutes');

const app = express();
const PORT = process.env.PORT || 3005;

app.use(bodyParser.json());

app.use('/accounts', accountRoutes);

app.listen(PORT, () => {
  console.log(`Account-Service running on port ${PORT}`);
});
