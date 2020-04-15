const express = require('express')
const app = express()
const PORT = 8000;


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