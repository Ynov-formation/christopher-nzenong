// accountRoutes.js
const express = require('express');
const AccountController = require('../controllers/accountController');

const authenticateMiddleware = require('../middleware/authentificationMiddleware')


const router = express.Router();

// Ajouter un nouveau compte
router.post('/', AccountController.addAccount);

// Obtenir tous les comptes
router.get('/', AccountController.getAllAccounts);

// Obtenir un compte par ID
router.get('/:id', AccountController.getAccount);

// Mettre à jour un compte par ID
router.put('/:id', AccountController.updateAccount);

// Supprimer un compte par ID
router.delete('/:id', AccountController.deleteAccount);

module.exports = router;
