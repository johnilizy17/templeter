const express = require('express');
const app = express();
const db = require('./app/config/db.config.js')

global.__basedir = __dirname;

db.sequelize.sync({force:true}).then(()=>{
    console.log('Drop and Resync with {force:true');
})

let router = require('./app/routers/excel.router.js');
app.use(express.static('resources'));
app.use('/', router)

const server = app.listen(9000, function(){
    let host = server.address().address
    let port = server.address().port 
    console.log('App listening at http', host, prot)
})