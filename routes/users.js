const express = require('express');
const users = express.Router();

users.get('/login', () => {
  console.log('login');
});

users.post('/login', (user) => {
  console.log(user)
});

module.exports = users;
