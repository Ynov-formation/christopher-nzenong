const express = require('express');
const TransactionController = require('../controllers/transactionController');

const authenticateMiddleware = require('../middleware/authentificationMiddleware')


const router = express.Router();

// Routes pour les opérations de transactions
router.post('/credit', TransactionController.makeCredit);
router.post('/debit', TransactionController.makeDebit);
router.post('/transfer',TransactionController.makeTransfer);

// Route pour récupérer les transactions par compte ID
router.get('/account/:accountId', TransactionController.getTransactionsByAccountId);

module.exports = router;