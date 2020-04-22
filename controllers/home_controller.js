const Post = require('../models/post')
const User = require('../models/user')

module.exports.home = async (req,res) => {
    try {
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'likes',
            select:'user -_id'
        })
        .populate(({
            path: 'comments',
            options: { sort: '-createdAt'  } ,
            populate: [
                {
                    path: 'user',
                    select: 'name'
                },
                {
                    path: 'likes',
                    select: 'user -_id'
                }
            ]
        }))
        console.log(posts[0].comments[0].likes)
        let users = await User.find({})
    
        return res.render('home', {
            posts: posts,
            all_users: users
        })
    } catch (err) {
        console.log('Error', err);
        return;
    }

}