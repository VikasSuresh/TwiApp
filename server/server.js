const express =require('express');
const app =express();
const path=require('path');
app.use('/img',express.static(path.join(__dirname,'public/img')));   

require('./startup/db')();
require('./startup/prod')(app);
require('./startup/route')(app);



if(process.env.NODE_ENV==='production'){
    app.use(express.static('twiapp/build'));
    
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'twiapp','build','index.html'));
    })
}

console.log(path.resolve(__dirname,'twiapp','build','index.html'))
const port = process.env.PORT || 1000;

app.listen(port,()=>{    
    console.log('Listening on '+port);    
})