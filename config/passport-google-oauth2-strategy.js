const passport = require('passport')
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto')
const User = require('../models/user')
const env = require('../environment/env')

passport.use(new googleStrategy({
    clientID: env.google_oauth_client_id,
    clientSecret: env.google_oauth_client_secret,
    callbackURL: 'http://localhost:8000/users/auth/google/callback'
    }, 
    (accessToken, refreshToken, profile, done)=>{
        User.findOne({email: profile.emails[0].value})
        .exec((err, user)=>{
            if (err){console.log("error in google strategy passport"); return done(err, null);}
            if (user){
                //If the user is there, just return it
                return done(null, user)
            } else {
                //User doesn't exists already, so sign that user up
                User.create({
                    email: profile.emails[0].value,
                    name: profile.displayName,
                    password: crypto.randomBytes(20).toString('hex')
                }, (err, user)=>{
                    if (err){console.log("Error in creating user in google oauth passport"); return done(err, null);}
                    return done(null, user);
                })
            }
        })
    }
))