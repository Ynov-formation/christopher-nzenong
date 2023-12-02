const express = require('express');

const app = express();
const PORT = process.env.PORT || 3002;

const authRoutes = require('../routes/authRoutes');

app.use(express.json());
// Routes
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Auth-Service running on port ${PORT}`);
  });
  
module.exports = app;