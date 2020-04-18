const User = require("../../../models/user")
const jwt = require('jsonwebtoken')
const env = require('../../../environment/env')

module.exports.createSession = async (req, res) => {
    try {
        let user = await User.findOne({email: req.body.email})
        if (!user || user.password != req.body.password){
            return res.status(422).json({
                success:false,
                message: "Invalid email or password"
            })
        } else{
            return res.status(200).json({
                success:true,
                message:"Sign in successfull",
                data: {
                    token: jwt.sign(user.toJSON(), env.jwtSecret, {expiresIn:'3600000'})
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in logging in"
        })
    }
}

module.exports.create = async (req,res)=>{
    try {
        if(req.body.password != req.body.confirm_password){
            return res.status(401).json({
                success:false,
                message: "Password don't match"
            })
        }
        let user = await User.findOne({email: req.body.email})
        if (!user){
            let newUser = await User.create(req.body)
            return res.status(200).json({
                success:true,
                message: "New user created, please sign in"
            })
        } else{
            res.status(401).json({
                success:false,
                message: "User already exists"
            })
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            message: "Internal server error"
        })
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
            return res.status(200).json({
                message:"Updated successfully",
                success:true
            })
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"You are unauthorized to do that"
            })
        }
    } else {
        return res.status(403).json({
            success:false,
            message:"Unauthorized"
        });
    }
}