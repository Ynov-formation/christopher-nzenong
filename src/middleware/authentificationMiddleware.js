const jwt = require('jsonwebtoken');
const config = require('../config/auth');

function authenticationMiddleware(req, res, next) {

  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing token' });
  }

  try {
    // Vérifie la validité du token en utilisant la clé secrète
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
}

module.exports = authenticationMiddleware;