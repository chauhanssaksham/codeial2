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