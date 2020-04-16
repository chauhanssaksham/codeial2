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

//Check if the user is authenticated:
passport.checkAuthentication = function(req,res, next){
    //if the user is signed in, pass on the control to the next function (controllers' action)
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

  module.exports = passport;