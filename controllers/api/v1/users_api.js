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