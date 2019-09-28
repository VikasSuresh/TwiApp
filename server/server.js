const express =require('express');
const app =express();
const cors= require('cors');
const path=require('path');
const fileupload=require('express-fileupload');
const {twiRoute}=require('./routes/twiRoute');
const helmet=require('helmet');
const compression=require('compression');


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(helmet())
app.use(compression())
app.use(fileupload());
app.use('/img',express.static(path.join(__dirname,'public/img')));


app.use('/api',twiRoute);

const port = process.env.PORT || 1000;

app.listen(port,()=>{    
    console.log('Listening on '+port);    
})