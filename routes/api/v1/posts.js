const express = require('express')
const router = express.Router()
const passport = require('passport')
const postApiController = require('../../../controllers/api/v1/post_api')

//@route        GET /api/v1/posts
//@description  get a list of all posts
//@access       Public
router.get('/', postApiController.index)

//@route        DELETE api/v1/posts/:id
//@description  delete the post with (:id)
//@access       Private
// TOKEN:        Set header: "Authorization": "Bearer <token>"
router.delete('/:id', passport.authenticate('jwt', {session: false}), postApiController.destroy)

module.exports = router;