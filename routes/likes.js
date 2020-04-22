const express = require('express');
const router = express.Router();
const likesController = require('../controllers/likes_controller')
const passport = require('passport')

//------------------ /likes/?id=abcde&model=comment
router.post('/', passport.checkAuthentication, likesController.toggleLike)

module.exports = router;