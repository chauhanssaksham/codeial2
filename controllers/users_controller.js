const User = require('../models/user')

module.exports.profile = (req,res)=>{
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, (err, user)=>{
            if (err){
                console.log("Not authenticated");
                return res.redirect('back')
            }
            if(user){
                return res.render('user_profile', {
                    user:user
                })
            }
        })
    } else{
        return res.render('/users/sign-in')
    }
}

module.exports.signIn = (req,res)=>{
    if(req.cookies.user_id){
        res.redirect('/users')
    } else{
        return res.render('user_sign_in')
    }
}

module.exports.signUp = (req,res)=>{
    if(req.cookies.user_id){
        res.redirect('/users')
    } else{
        return res.render('user_sign_up')
    }
}

module.exports.create = (req,res)=>{
    if(req.body.password != req.body.confirm_password){
        res.redirect('back')
    }
    User.findOne({email: req.body.email}, (err,user)=>{
        if (err){
            console.log("Error in Finding the user");
            return;
        }
        if (!user){
            User.create(req.body, (err, user)=>{
                if (err){
                    console.log("Error in creating the user");
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        } else{
            res.redirect('back')
        }
    })
}

module.exports.createSession = (req,res)=>{
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) {
            console.log("Error in logging in");
            return;
        }
        if (user){
            if (user.password != req.body.password){
                return res.redirect('back');
            }
            res.cookie('user_id', user.id);
            return res.redirect('/users');
        } else {
            console.log("User not found");
            return res.redirect('back');
        }
    });
}

module.exports.destroySession = (req,res)=>{
    if (req.cookies.user_id){
        res.clearCookie('user_id');
    }
    return res.redirect('/users/sign-in');
}