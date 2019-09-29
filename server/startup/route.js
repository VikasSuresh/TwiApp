const express= require('express');
const {twiRoute}=require('../routes/twiRoute');

module.exports=function(app){    
    app.use(express.json());
    app.use(express.urlencoded({extended:true}))    
    app.use('/api',twiRoute);
}

