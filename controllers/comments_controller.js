const Comment = require('../models/comment')
const Post = require('../models/post')

module.exports.create =  async (req,res) => {
    try {
        let post = await Post.findById(req.body.post)
        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
            post.comments.push(comment);
            post.save();
            return res.redirect('/');
        }  
    } catch (error) {
        console.log("Error", error)
        return
    }
}

module.exports.destroy = async (req,res) => {
    try {   
        let comment = await Comment.findById(req.params.id).populate('post')
        if (comment){
            if (comment.user == req.user.id || comment.post.user == req.user.id){
                let post_id = comment.post;
                comment.remove();
                await Post.findByIdAndUpdate(post_id, {$pull: {comments: req.params.id}})
                return res.redirect('back');
            }
        } else {
            return res.redirect('back');
        } 
    } catch (error) {
        console.log("Error", error)
        return
    }
}