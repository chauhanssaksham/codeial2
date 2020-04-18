const express = require('express')
const router = express.Router()
const usersApiController = require('../../../controllers/api/v1/users_api')
const passport = require('passport')

//@route        POST /api/v1/users/login
//@description  Log in a user
//@access       Public
//@Required     req.body fields: email and password
router.post('/login', usersApiController.createSession)

//@route        POST /api/v1/users/create
//@description  Create/signup a user
//@access       Public
//@Required     req.body fields: name, email and password & confirm_password
router.post('/create', usersApiController.create)

//@route        POST /api/v1/users/update/:id
//@description  Update user info, add/change profile pic
//@access       Private
//@Required     req.body fields: name, email, avatar (containing photo)
router.post('/update/:id', passport.authenticate('jwt', {session:false}), usersApiController.update)


module.exports = router;