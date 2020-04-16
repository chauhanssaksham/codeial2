const Post = require('../models/post')
const Comment = require('../models/comment')

module.exports.createPost = async (req,res) => {
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        return res.redirect('back')
    } catch (error) {
        console.log("Error", error)
        return
    }

}

module.exports.destroy = async (req,res) => {
    try {
        let post = await Post.findById(req.params.id)
        if (post.user == req.user.id){
            //Delete the post
            post.remove();
            await Comment.deleteMany({post: req.params.id})
        }
        return res.redirect('back');
    } catch (error) {
        console.log("Error", error)
        return
    }

}