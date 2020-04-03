var express = require('express');
var router = express.Router();
const getAll = require('../utils/api');

/* GET home page. */
router.get('/', function(req, res, next) {
  getAll();
  res.render('index', { title: 'Express' });
});

module.exports = router;
