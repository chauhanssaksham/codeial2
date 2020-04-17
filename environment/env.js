//Have a development.env file for development variables
// and production.env file for production variables
// in this directory (/environment/example.env)

const dotenv = require('dotenv')
const path = require('path')

if (process.env.NODE_ENV == 'production'){
    dotenv.config({path: path.join(__dirname, 'production.env')})
} else {
    dotenv.config({path: path.join(__dirname, 'development.env')})
}

module.exports = {
    name:process.env.PROCESS_NAME,
    google_oauth_client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
    google_oauth_client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    google_oauth_callback_url: process.env.GOOGLE_OAUTH_CALLBACK_URL,
    db_uri: process.env.DB_URI,
    asset_path: process.env.ASSET_PATH,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAILER_GMAIL_USER,
            pass: process.env.MAILER_GMAIL_PASS
        }
    },
    session_cookie_key: process.env.SESSION_COOKIE_KEY
}