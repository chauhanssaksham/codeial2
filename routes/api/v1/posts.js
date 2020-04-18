const express = require('express')
const router = express.Router()
const postApiController = require('../../../controllers/api/v1/post_api')

//@route        GET /api/v1/posts
//@description  get a list of all posts
//@access       Public
router.get('/', postApiController.index)

//@route        DELETE api/v1/posts/:id
//@description  delete the post with (:id)
//@access       Private (YET TO ADD AUTHORIZATION)
// TOKEN:        Set header 'x-auth-token'
router.delete('/:id', postApiController.destroy)

module.exports = router;