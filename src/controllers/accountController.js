const Account = require('../models/accountModel');

class AccountController {
  // Ajouter un nouveau compte
  static async addAccount(req, res) {
    try {
      const { accountNumber, accountType, balance, clientId } = req.body;
      const newAccount = new Account({ accountNumber, accountType, balance, clientId });
      const savedAccount = await newAccount.save();
      res.status(201).json(savedAccount);
    } catch (error) {
      console.error('Error adding account:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Obtenir tous les comptes
  static async getAllAccounts(req, res) {
    try {
      const accounts = await Account.find();
      res.json(accounts);
    } catch (error) {
      console.error('Error fetching accounts:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Obtenir un compte par ID
  static async getAccount(req, res) {
    const accountId = req.params.id;
    try {
      const account = await Account.findById(accountId);
      if (!account) {
        res.status(404).json({ error: 'Account not found' });
        return;
      }
      res.json(account);
    } catch (error) {
      console.error('Error fetching account:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Mettre à jour un compte par ID
  
  static async updateAccount(req, res) {
    const accountId = req.params.id;
    const { accountNumber, accountType, balance, clientId } = req.body;
    try {
      const updatedAccount = await Account.findByIdAndUpdate(
        accountId,
        { accountNumber, accountType, balance, clientId },
        { new: true } // Renvoie le document mis à jour
      );
      if (!updatedAccount) {
        res.status(404).json({ error: 'Account not found' });
        return;
      }
      res.json(updatedAccount);
    } catch (error) {
      console.error('Error updating account:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Supprimer un compte par ID
  static async deleteAccount(req, res) {
    const accountId = req.params.id;
    try {
      const deletedAccount = await Account.findByIdAndDelete(accountId);
      if (!deletedAccount) {
        res.status(404).json({ error: 'Account not found' });
        return;
      }
      res.json(deletedAccount);
    } catch (error) {
      console.error('Error deleting account:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = AccountController;
