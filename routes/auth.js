const express = require('express');
const auth = express.Router();

auth.get('/login', () => {
  console.log('login');
});

auth.get('/signup', () => {
  console.log('signup');
});

module.exports = auth;
