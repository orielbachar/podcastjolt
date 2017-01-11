var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('../models/Users');

passport.use(new LocalStrategy(
  { usernameField: 'phoneNum' }, function(phoneNum, password, done) {
    User.findOne({ phoneNum: phoneNum }, function (err, user) {
      if (err) { return done(err); }

      if (!user) {
        return done(null, false, { message: 'The given phone number is not registered in the system.' });
      }

      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    });
  }
));