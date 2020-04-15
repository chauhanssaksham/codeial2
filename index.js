const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const PORT = 8000;

app.use(expressLayouts)

app.set('view engine', 'ejs')
app.set('views', './views')

//Use express router
app.use('/', require('./routes'))





app.listen(PORT, (err)=>{
    if (err){
        console.log(err);
    } else{
        console.log(`Server up and running on port ${PORT}`);
    }
})