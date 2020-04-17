const Comment = require('../models/comment')
const Post = require('../models/post')
const queue = require('../config/kue')
const commentEmailWorker = require('../workers/comment_email_worker')

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

            //Populate the comment to pass it into the comment mailer
            comment = await Comment.findById(comment._id).populate({path:'user', select:'name email'})
            // commentMailer.newComment(comment)
            let job = queue.create('emails', comment).save((err)=>{
                if(err){console.log('error in creating the queue')}
                console.log("Job enqueued", job.id)
            })
            req.flash('success', "Comment created successfully")
            return res.redirect('/');
        }  
    } catch (error) {
        req.flash('error', "Something went wrong")
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
                req.flash('success', "Comment deleted successfully")
                return res.redirect('back');
            }
        } else {
            req.flash('error', "Unable to locate the comment")
            return res.redirect('back');
        } 
    } catch (error) {
        req.flash('error', "Something went wrong")
        console.log("Error", error)
        return
    }
}