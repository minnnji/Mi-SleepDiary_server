var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
  res.render('login');
});

router.post('/google',
  passport.authenticate('google', { scope: ['profile'] })
);

router.get('/google/callback',
  passport.authenticate('google',{ failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

module.exports = router;
