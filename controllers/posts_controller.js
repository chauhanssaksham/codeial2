const Post = require('../models/post')
const Comment = require('../models/comment')
const User = require('../models/user')

module.exports.createPost = async (req,res) => {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        post.user = await User.findById(post.user).select('name');
        if(req.xhr){
            return res.status(200).json({
                data: post,
                message:"Post Created"
            });

        }

        req.flash('success', "Post published")
        return res.redirect('back')
    } catch (error) {
        req.flash('error', "Couldn't publish post")
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
        req.flash('success', "Post deleted successfully")
        return res.redirect('back');
    } catch (error) {
        req.flash('error', "Couldn't delete your post")
        console.log("Error", error)
        return
    }

}