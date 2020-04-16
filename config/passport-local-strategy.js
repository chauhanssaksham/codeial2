const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

passport.use(new LocalStrategy({
        usernameField: 'email'
    }, (email, password, done) => {
        User.findOne({ email: email }, (err, user) => {
            if (err) { 
                console.log('Error in finding User --> passport');
                return done(err); 
            }
            if (!user || user.password != password) {
                console.log("Incorrect email or password");
                return done(null, false, { message: 'Incorrect email or password'});
            }
            return done(null, user);
        });
    }
  ));

  //Serialize the user to decide which key to keep in the cookies
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  //Deserialize the user from the key in the cookies
  passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user) {
    if (err) { 
            console.log('Error in finding User --> passport');
            return done(err); 
    }
      done(err, user);
    });
  });

  module.exports = passport;