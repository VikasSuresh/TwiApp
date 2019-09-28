const express =require('express');
const app =express();
const path=require('path');
app.use('/img',express.static(path.join(__dirname,'public/img')));   

require('./startup/db')();
require('./startup/prod')(app);
require('./startup/route')(app);

const port = process.env.PORT || 1000;

app.listen(port,()=>{    
    console.log('Listening on '+port);    
})