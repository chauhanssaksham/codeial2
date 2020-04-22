const Like = require('../models/like')
const Post = require('../models/post')
const Comment = require('../models/comment')

module.exports.toggleLike = async (req,res)=>{
    try {
        console.log("Ok");
        let likedObj;
        let deleted = false;
        if (req.query.type == 'post'){
            likedObj = await Post.findById(req.query.id).populate('likes')
        } else {
            likedObj = await Comment.findById(req.query.id).populate('likes')
        }
        let existingLike = await Like.findOne({
            likedObj: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        })
        if (existingLike){
            likedObj.likes.pull(existingLike._id);
            likedObj.save();
            existingLike.remove();
            deleted = true;
        } else {
            let newLike = await Like.create({
                user: req.user._id,
                onModel: req.query.type,
                likedObj: req.query.id
            })
            likedObj.likes.push(newLike)
            likedObj.save();
        }
        return res.json({
            message: "Request Successful",
            data:{
                deleted: deleted
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error",
            success:false
        })
    }
}