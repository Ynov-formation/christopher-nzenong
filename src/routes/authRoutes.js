// src/routes/authRoutes.js
const express = require('express');
const AuthController = require('../controllers/authController');

const router = express.Router();

// Route pour la connexion
router.post('/login', AuthController.login);

module.exports = router;
