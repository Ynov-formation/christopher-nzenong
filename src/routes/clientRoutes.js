const express = require('express');
const ClientController = require('../controllers/clientController');

const authenticateMiddleware = require('../middleware/authentificationMiddleware')

const router = express.Router();

// Ajouter un nouveau client
router.post('/', ClientController.addClient);

// Obtenir tous les clients
router.get('/', ClientController.getAllClients);

// Obtenir un client par ID
router.get('/:id', ClientController.getClient);

// Mettre à jour un client par ID
router.put('/:id', ClientController.updateClient);

// Supprimer un client par ID
router.delete('/:id', ClientController.deleteClient);

module.exports = router;