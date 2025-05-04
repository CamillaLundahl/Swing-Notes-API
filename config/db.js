const Datastore = require('nedb');
const path = require('path');

// Databaser
const users = new Datastore({ filename: path.join(__dirname, '../data/users.db'), autoload: true });
const notes = new Datastore({ filename: path.join(__dirname, '../data/notes.db'), autoload: true });

module.exports = { users, notes };