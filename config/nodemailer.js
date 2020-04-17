const nodemailer = require('nodemailer')
const env = require('../environment/env')
const ejs = require('ejs')
const path = require('path')

let transporter = nodemailer.createTransport(env.smtp)

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailTemplates', relativePath),
        data,
        (err, template)=>{
            if(err){console.log("error in rendering template");}
            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {transporter, renderTemplate}