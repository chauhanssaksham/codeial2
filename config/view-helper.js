const env = require('../environment/env')
const fs = require('fs')
const path = require('path')

module.exports = (app) =>{
    app.locals.assetPath = function(filePath){
        if (env.name == 'development'){
            return '/' + filePath;
        }
        else {
            let a = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/rev-manifest.json')))[filePath];
            console.log(a);
            return '/' + a;
        }
    }
}