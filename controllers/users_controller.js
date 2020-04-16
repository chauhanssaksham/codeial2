const User = require('../models/user')

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
            let user = await User.findByIdAndUpdate(req.params.id, req.body)
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