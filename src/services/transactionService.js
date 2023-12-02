const express = require('express');
const bodyParser = require('body-parser');
const transactionRoutes = require('../routes/transactionRoutes');

const app = express();
const PORT = process.env.PORT || 3006;

app.use(bodyParser.json());

// Intégration des routes de transaction
app.use('/transactions', transactionRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Transaction-Service running on port ${PORT}`);
});
