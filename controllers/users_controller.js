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
            return res.redirect('back');
        } catch (error) {
            console.log('error', error);
            return;
        }
    } else {
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
            return res.redirect('/users/sign-in')
        } else{
            res.redirect('back')
        }
    } catch (error) {
        console.log("Error", error)
        return
    }
}

module.exports.createSession = (req,res) =>{
    //Thanks to passport, the user is already signed in by this point
    //Cookie has already been set
    return res.redirect('/users/profile/' + req.user.id);
}

module.exports.destroySession = (req, res) => {
    req.logout();
    return res.redirect('/users/sign-in');
}