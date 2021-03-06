const User = require('../models/user')
const fs = require('fs')
const path = require('path')

module.exports.profile = async (req,res)=>{
    try {
        let user = await User.findById(req.params.id)
        return res.render('user_profile', {
            profile_user: user
        })
    } catch (error) {
       console.log('Error', error);
       return; 
    }
}

module.exports.update = async (req,res) => {
    if (req.user.id == req.params.id){
        try {
            let user = await User.findById(req.params.id)
            User.uploadedAvatar(req, res, function(err){
                if (err){console.log("***Multer Error", err);}
                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file){  //If a file is also uploaded
                    if(user.avatar && fs.existsSync(path.join(__dirname, '..', user.avatar))){    //User has avatar field, and that file exists in the system
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar))  //Delete the previous image
                    }
                    //Save the path of the uploaded file into user.avatar
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
            })
            req.flash('success', "Updated successfully")
            return res.redirect('back');
        } catch (error) {
            req.flash('error', "Something went wrong")
            console.log('error', error);
            return;
        }
    } else {
        req.flash('error', "Error, you are unauthorized to do that")
        return res.status(403).send('Unauthorized');
    }
}

module.exports.signIn = (req,res)=>{
    if (req.isAuthenticated()){
        return res.redirect('/users');
    }
    return res.render('user_sign_in')
}

module.exports.signUp = (req,res)=>{
    if (req.isAuthenticated()){
        return res.redirect('/users');
    }
    return res.render('user_sign_up')
}

module.exports.create = async (req,res)=>{
    try {
        if(req.body.password != req.body.confirm_password){
            return res.redirect('back')
        }
        let user = await User.findOne({email: req.body.email})
        if (!user){
            await User.create(req.body)
            req.flash('success', "Account created!")
            return res.redirect('/users/sign-in')
        } else{
            req.flash('error', "Account with that email already exists!")
            res.redirect('back')
        }
    } catch (error) {
        req.flash('error', "Something went wrong!")
        console.log("Error", error)
        return
    }
}

module.exports.createSession = (req,res) =>{
    //Thanks to passport, the user is already signed in by this point
    //Cookie has already been set
    req.flash('success', 'Logged in successfully')
    return res.redirect('/users/profile/' + req.user.id);
}

module.exports.destroySession = (req, res) => {
    req.logout();
    req.flash('success', 'Logged out successfully')
    return res.redirect('/users/sign-in');
}