const express= require('express');
const {twiRoute}=require('../routes/twiRoute');
const {userRoute}=require('../routes/userRoute');

module.exports=function(app){    
    app.use(express.json());
    app.use(express.urlencoded({extended:true}))    
    app.use('/api',twiRoute);
    app.use('/user',userRoute);
}

