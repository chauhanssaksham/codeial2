const Comment = require('../../../models/comment')
const Post = require('../../..//models/post')
const queue = require('../../../config/kue')
const commentEmailWorker = require('../../../workers/comment_email_worker')

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
            return res.status(200).json({
                message:"Comment posted",
                success:true
            })
        }  
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

module.exports.destroy = async (req,res) => {
    try {   
        let comment = await Comment.findById(req.params.id).populate('post')
        if (comment){
            if (comment.user == req.user.id || comment.post.user == req.user.id){
                console.log('here')
                let post_id = comment.post;
                comment.remove();
                await Post.findByIdAndUpdate(post_id, {$pull: {comments: req.params.id}})
                return res.status(200).json({
                    success:true,
                    message: "Commented deleted"
                })
            } else{
                return res.status(401).json({
                    success:false,
                    message:"Unauthorized to do that"
                })
            }
        } else {
            return res.status(404).json({
                success:false,
                message:"Unable to locate the comment"
            })
        } 
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}