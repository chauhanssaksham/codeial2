const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')
const MongoStore = require('connect-mongo')(session)
const db = require('./config/mongoose')
const path = require('path')
const sassMiddleware = require('node-sass-middleware')
const flash = require('connect-flash') //Stores the flash message in the session cookies, which is deleted on page refresh
const flashMW = require('./config/flash')

const PORT = 8000;


app.use(sassMiddleware({
    src: './assets/scss',
    dest:'./assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


//Set Assets
app.use(express.static('./assets'))
//Make the /uploads path available to the user so that the profile page can load it
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))) 

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
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'},
        function (err){
            console.log(err || 'Connect-mongo setup ok');
        }
    )
}));

app.use(passport.initialize())
app.use(passport.session())
app.use(passport.setAuthenticatedUser);

app.use(flash())
app.use(flashMW.setFlash)

//Use express router
app.use('/', require('./routes'))



app.listen(PORT, (err)=>{
    if (err){
        console.log(err);
    } else{
        console.log(`Server up and running on port ${PORT}`);
    }
})