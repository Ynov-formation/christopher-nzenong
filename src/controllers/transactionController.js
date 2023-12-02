// transactionController.js
const Transaction = require('../models/transactionModel');
const Account = require('../models/accountModel');

class TransactionController {
  static async makeCredit(req, res) {
    try {
      const { amount, sourceAccount } = req.body;
      
      // Vérifier que le compte source existe
      const account = await Account.findById(sourceAccount);
      if (!account) {
        return res.status(404).json({ error: 'Source account not found' });
      }

      // Créer la transaction de crédit
      const creditTransaction = new Transaction({
        type: 'Credit',
        amount,
        sourceAccount,
        timestamp: Date.now(),
      });

      // Sauvegarder la transaction
      await creditTransaction.save();

      // Mettre à jour le solde du compte
      account.balance += amount;
      await account.save();

      res.status(201).json(creditTransaction);
    } catch (error) {
      console.error('Error making credit transaction:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async makeDebit(req, res) {
    try {
      const { amount, sourceAccount } = req.body;

      // Vérifier que le compte source existe
      const account = await Account.findById(sourceAccount);
      if (!account) {
        return res.status(404).json({ error: 'Source account not found' });
      }

      // Vérifier que le solde du compte est suffisant
      if (account.balance < amount) {
        return res.status(400).json({ error: 'Insufficient funds' });
      }

      // Créer la transaction de débit
      const debitTransaction = new Transaction({
        type: 'Debit',
        amount,
        sourceAccount,
        timestamp: Date.now(),
      });

      // Sauvegarder la transaction
      await debitTransaction.save();

      // Mettre à jour le solde du compte
      account.balance -= amount;
      await account.save();

      res.status(201).json(debitTransaction);
    } catch (error) {
      console.error('Error making debit transaction:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async makeTransfer(req, res) {
    try {
      const { amount, sourceAccount, destinationAccount } = req.body;

      // Vérifier que les comptes source et destination existent
      const source = await Account.findById(sourceAccount);
      const destination = await Account.findById(destinationAccount);
      if (!source || !destination) {
        return res.status(404).json({ error: 'Source or destination account not found' });
      }

      // Vérifier que le solde du compte source est suffisant
      if (source.balance < amount) {
        return res.status(400).json({ error: 'Insufficient funds' });
      }

      // Créer la transaction de transfert
      const transferTransaction = new Transaction({
        type: 'Transfer',
        amount,
        sourceAccount,
        destinationAccount,
        timestamp: Date.now(),
      });

      // Sauvegarder la transaction
      await transferTransaction.save();

      // Mettre à jour les soldes des comptes source et destination
      source.balance -= amount;
      destination.balance += amount;
      await source.save();
      await destination.save();

      res.status(201).json(transferTransaction);
    } catch (error) {
      console.error('Error making transfer transaction:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getTransactionsByAccountId(req, res) {
    try {
      const { accountId } = req.params;

      // Vérifier que le compte existe
      const account = await Account.findById(accountId);
      if (!account) {
        return res.status(404).json({ error: 'Account not found' });
      }

      // Récupérer les transactions liées au compte
      const transactions = await Transaction.find({
        $or: [{ sourceAccount: accountId }, { destinationAccount: accountId }],
      });

      res.json(transactions);
    } catch (error) {
      console.error('Error getting transactions by account ID:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = TransactionController;
