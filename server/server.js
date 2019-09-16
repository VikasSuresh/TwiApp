const express =require('express');
const app =express();
const cors= require('cors');
const path=require('path');
const file_upload=require('express-fileupload');
const {twiRoute}=require('./route-app/twiRoute');


app.use('/img',express.static(path.join(__dirname,'public/img')));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(file_upload());


app.use('/',twiRoute);
app.listen('1000',()=>{    
    console.log('Listening');    
})