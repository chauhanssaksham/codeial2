module.exports.profile = (req,res)=>{
    return res.render('user_profile')
}

module.exports.signIn = (req,res)=>{
    return res.render('user_sign_in')
}

module.exports.signUp = (req,res)=>{
    return res.render('user_sign_up')
}