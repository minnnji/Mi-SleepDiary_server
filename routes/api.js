const express = require('express');
const api = express.Router();
const authRouter = require('./auth');

api.use('/auth', authRouter);

module.exports = api;
