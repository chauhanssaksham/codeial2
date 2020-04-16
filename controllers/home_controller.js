const Post = require('../models/post')
const User = require('../models/user')

module.exports.home = (req,res) => {
    Post.find({})
    .populate('user')
    .populate(({
        path: 'comments',
        populate: {
            path: 'user'
        }
    }))
    .exec((err,posts)=>{

        User.find({}, (err, users)=>{
            return res.render('home', {
                posts: posts,
                all_users: users
            })
        })
    })
}