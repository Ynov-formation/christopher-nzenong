const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Avant de sauvegarder l'utilisateur dans la base de données, hachez le mot de passe
userSchema.pre('save', async function (next) {
  const user = this;

  // Assurez-vous que le mot de passe a été modifié ou est nouveau
  if (!user.isModified('password')) return next();

  try {
    // Générez un sel pour le hachage
    const salt = await bcrypt.genSalt(10);

    // Hachez le mot de passe avec le sel
    const hashedPassword = await bcrypt.hash(user.password, salt);

    // Remplacez le mot de passe en clair par le mot de passe haché
    user.password = hashedPassword;

    return next();
  } catch (error) {
    return next(error);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
