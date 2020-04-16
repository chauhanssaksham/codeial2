const Comment = require('../models/comment')
const Post = require('../models/post')

module.exports.create = (req,res) => {
    Post.findById( req.body.post , (err, post)=>{
        if (err){
            console.log("Error, no such post exists");
            return res.redirect('back');
        }
        if (post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, (err, comment) => {
                if(err){
                    console.log(err);
                    return res.redirect('back');
                }
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            })
        }
    })
}

module.exports.destroy = (req,res) => {
    Comment.findById(req.params.id).populate('post').exec((err,comment)=>{
        if (err){
            console.log("Comment not found");
            return res.redirect('back');
        }
        if (comment){
            if (comment.user == req.user.id || comment.post.user == req.user.id){
                let post_id = comment.post;
                comment.remove();
                Post.findByIdAndUpdate(post_id, {$pull: {comments: req.params.id}}, (err, post)=>{
                    if (err){
                        return res.redirect('back');
                    }
                    return res.redirect('back');
                });
            }
        } else {
        return res.redirect('back');
        }
    })
}