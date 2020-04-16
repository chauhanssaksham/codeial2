const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller')
const passport = require('passport')

router.get('/profile/:id' , usersController.profile)
router.get('/sign-up', usersController.signUp)
router.get('/sign-in', usersController.signIn)

router.post('/create', usersController.create)

//Use passport as a middleware to authenticate
router.post('/login', passport.authenticate(
    'local',
    {
        failureRedirect: '/users/sign-in'
    }
) ,usersController.createSession)
router.get('/logout', usersController.destroySession)

module.exports = router;