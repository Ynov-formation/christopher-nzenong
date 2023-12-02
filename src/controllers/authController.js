const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/auth');
const User = require('../models/userModel');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Recherchez l'utilisateur dans la base de données
    const user = await User.findOne({ username });

    // Vérifiez si l'utilisateur existe
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Vérifiez le mot de passe
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Générez un token JWT
    const token = jwt.sign({ userId: user._id, username: user.username }, config.jwtSecret, { expiresIn: config.jwtExpiration });

    // Réponse avec le token
    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  login,
};