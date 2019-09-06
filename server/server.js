const express =require('express');
const app =express();
const cors= require('cors');
const {twiRoute}=require('./route-app/twiRoute');

app.use(cors());
app.use('/',twiRoute);

app.listen('1000',()=>{
    console.log('Listening');    
})