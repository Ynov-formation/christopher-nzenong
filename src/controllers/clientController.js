// clientController.js
const Client = require('../models/clientModel');

class ClientController {
  // Ajouter un nouveau client
  static async addClient(req, res) {
    try {
      const { firstName, lastName, email, phoneNumber, address, accounts } = req.body;
      const newClient = new Client({ firstName, lastName, email, phoneNumber, address, accounts });
      const savedClient = await newClient.save();
      res.status(201).json(savedClient);
    } catch (error) {
      console.error('Error adding client:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Obtenir tous les clients
  static async getAllClients(req, res) {
    try {
      const clients = await Client.find();
      res.json(clients);
    } catch (error) {
      console.error('Error fetching clients:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Obtenir un client par ID
  static async getClient(req, res) {
    const clientId = req.params.id;
    try {
      const client = await Client.findById(clientId);
      if (!client) {
        res.status(404).json({ error: 'Client not found' });
        return;
      }
      res.json(client);
    } catch (error) {
      console.error('Error fetching client:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Mettre à jour un client par ID
  static async updateClient(req, res) {
    const clientId = req.params.id;
    const { firstName, lastName, email, phoneNumber, address, accounts } = req.body;
    try {
      const updatedClient = await Client.findByIdAndUpdate(
        clientId,
        { firstName, lastName, email, phoneNumber, address, accounts },
        { new: true } // Renvoie le document mis à jour
      );
      if (!updatedClient) {
        res.status(404).json({ error: 'Client not found' });
        return;
      }
      res.json(updatedClient);
    } catch (error) {
      console.error('Error updating client:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Supprimer un client par ID
  static async deleteClient(req, res) {
    const clientId = req.params.id;
    try {
      const deletedClient = await Client.findByIdAndDelete(clientId);
      if (!deletedClient) {
        res.status(404).json({ error: 'Client not found' });
        return;
      }
      res.json(deletedClient);
    } catch (error) {
      console.error('Error deleting client:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = ClientController;