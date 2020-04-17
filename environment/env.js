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
    google_oauth_client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
    google_oauth_client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    db_uri: process.env.DB_URI
}