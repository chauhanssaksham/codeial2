const express = require('express')
const router = express.Router()
const usersApiController = require('../../../controllers/api/v1/users_api')

//@route        POST /api/v1/users/login
//@description  Log in a user
//@access       Public
//@Required     req.body fields: email and password
router.post('/login', usersApiController.createSession)

module.exports = router;