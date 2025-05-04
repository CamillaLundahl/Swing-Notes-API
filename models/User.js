const { users } = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class User {
  static async create(userData) {
    const { username, password } = userData;
    
    // Kollar om användaren redan finns
    const existingUser = await new Promise((resolve) => {
      users.findOne({ username }, (err, user) => {
        resolve(user);
      });
    });
    
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    // Hashad lösenord
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Skapar ny användaren
    const user = {
      username,
      password: hashedPassword,
      createdAt: new Date()
    };
    
    return new Promise((resolve, reject) => {
      users.insert(user, (err, newUser) => {
        if (err) reject(err);
        resolve(newUser);
      });
    });
  }
  
  static async login(userData) {
    const { username, password } = userData;
    
    // Hitta användare
    const user = await new Promise((resolve) => {
      users.findOne({ username }, (err, user) => {
        resolve(user);
      });
    });
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Kontrollera lösenord
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    
    // Genererar token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    return { token };
  }
}

module.exports = User;