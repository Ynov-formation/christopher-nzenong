const express = require('express');
const UserController = require('../controllers/userController');

const authenticateMiddleware = require('../middleware/authentificationMiddleware')


const router = express.Router();

// Créer un nouvel utilisateur
router.post('/', UserController.addUser);

// Obtenir tous les utilisateurs
router.get('/', UserController.getAllUsers);

// Obtenir un utilisateur par ID
router.get('/:id', UserController.getUser);

// Mettre à jour un utilisateur par ID
router.put('/:id', UserController.updateUser);

// Supprimer un utilisateur par ID
router.delete('/:id', UserController.deleteUser);

module.exports = router;
