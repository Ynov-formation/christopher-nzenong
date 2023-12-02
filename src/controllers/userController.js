
// userController.js
const User = require('../models/userModel');

class UserController {
  // Create a new user
  static async addUser(req, res) {
    try {
      const { username, email, password } = req.body;
      const newUser = new User({ username, email, password });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      console.error('Error adding user:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Get all users
  static async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Get a user by ID
  static async getUser(req, res) {
    const userId = req.params.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Update a user by ID
  static async updateUser(req, res) {
    const userId = req.params.id;
    const { username, email, password } = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { username, email, password },
        { new: true } // Returns the updated document
      );
      if (!updatedUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Delete a user by ID
  static async deleteUser(req, res) {
    const userId = req.params.id;
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.json(deletedUser);
    } catch (error) {
      console.error('Error deleting user:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = UserController;
