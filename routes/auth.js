var express = require('express');
var router = express.Router();
var passportTwitter = require('../auth/twitter');


router.get('/login', function(req, res, next) {
  
  res.render('login');
});


router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


router.get('/twitter',
  passportTwitter.authenticate('twitter'));

router.get('/twitter/callback',
  passportTwitter.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    
    req.flash("success", "You have succesfully logged in! Welcome "+ req.user.name);
    res.redirect('/');
  });
  
  
  module.exports = router;