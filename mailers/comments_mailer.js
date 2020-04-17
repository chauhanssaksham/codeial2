const nodeMailer = require('../config/nodemailer')
const env = require('../environment/env')

module.exports.newComment = (comment) => {
    // console.log("============", comment.user)
    nodeMailer.transporter.sendMail({
        from: env.smtp.auth.user + "@gmailcom",
        to: comment.user.email,
        subject: "New comment posted",
        html: '<h1>New comment posted</h1>'
    }, (err, info) => {
        if(err){console.log("Error in sending mail, ", err); return;}
        // console.log("Email sent", info);
    });
}