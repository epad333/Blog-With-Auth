var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../models/User');

passport.serializeUser(function (user, fn) {
  fn(null, user);
});

passport.deserializeUser(function (id, fn) {
  User.findById(id, function(err, user) {
    fn(err, user);
  });
});

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "https://futblog.herokuapp.com/auth/twitter/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({name: profile.displayName}, {name: profile.displayName,userid: profile.id, displayPic: profile.photos[0]}, function(err, user) {
      if (err) {
        
        console.log(err);
        return done(err);
      }
      console.log(user);
      done(null, user);
    });
  }
));

module.exports = passport;