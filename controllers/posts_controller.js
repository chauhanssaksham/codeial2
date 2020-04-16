const Post = require('../models/post')
const Comment = require('../models/comment')

module.exports.createPost = (req,res) => {
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, (err, post)=> {
        if(err){
            console.log("Error in creating the post");
        }
        return res.redirect('back');
    })
}

module.exports.destroy = (req,res) => {
    Post.findById(req.params.id, (err, post)=>{
        if (err){
            //Handle Error
            console.log("Error in finding the post");
            return res.redirect('back');
        }
        if (post){
            if (post.user == req.user.id){
                //Delete the post
                post.remove();
                Comment.deleteMany({post: req.params.id}, (err)=>{
                    return res.redirect('back');
                })
            }
            else{
                //Handle unauthorized error
                return res.redirect('back');
            }
        }
    })
}