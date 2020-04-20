const express = require('express');
const router = express.Router();
const commentsApiController = require('../../../controllers/api/v1/comments')
const passport = require('passport')

//@route        POST api/v1/comments
//@description  Create a new comment
//@access       Private
// TOKEN:        Set header: "Authorization": "Bearer <token>"
//req.body        content: "XYZ", post: post.id
router.post('/', passport.authenticate('jwt', {session: false}) , commentsApiController.create)

//@route        DELETE api/v1/comments/:id
//@description  delete the comment with (:id)
//@access       Private
// TOKEN:        Set header: "Authorization": "Bearer <token>"
router.delete('/:id', passport.authenticate('jwt', {session: false}), commentsApiController.destroy)

module.exports = router;