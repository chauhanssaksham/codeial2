const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')
const PORT = 8000;
const db = require('./config/mongoose')

app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


//Set Assets
app.use(express.static('./assets'))

//Layouts Render
app.use(expressLayouts)
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(session({
    name: "Codeial2",
    //TODO: change the secret before deployment
    secret: 'developmentSecret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: (1000*60*60)
    }
}));

app.use(passport.initialize())
app.use(passport.session())

//Use express router
app.use('/', require('./routes'))



app.listen(PORT, (err)=>{
    if (err){
        console.log(err);
    } else{
        console.log(`Server up and running on port ${PORT}`);
    }
})