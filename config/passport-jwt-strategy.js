const passport = require('passport')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const User = require('../models/user')
const env = require('../environment/env')

let options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwtSecret
}

passport.use(new JWTStrategy(options, async (jwtPayload, done)=>{
    try {
        let user = await User.findById(jwtPayload._id)
        if (user){
            return done(null, user)
        } else {
            return done(null, false)
        }
    } catch (error) {
        console.log(error)
        done(error, null)
    }
}))

module.exports = passport