const Post = require('../../../models/post')
const Comment = require('../../../models/comment')

module.exports.index = async (req, res) =>{
    let posts = await Post.find({})
        .sort('-createdAt')
        .populate({path: 'user', select:'name email'})
        .populate({
            path: 'comments',
            select:'content user',
            populate: {
                path: 'user',
                select:'name email'
            }
        })
    return res.status(200).json({posts})
}

module.exports.destroy = async (req,res) => {
    try {
        let post = await Post.findById(req.params.id)
        // if (post.user == req.user.id){
            //Delete the post
            post.remove();
            await Comment.deleteMany({post: req.params.id})
            return res.status(200).json({
                message: "Post deleted successfully",
                success:true
            });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error
        })
    }

}
