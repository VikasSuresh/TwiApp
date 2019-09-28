const cors= require('cors');
const fileupload=require('express-fileupload');
const helmet=require('helmet');
const compression=require('compression');


module.exports=function(app){
    app.use(cors());
    app.use(helmet())
    app.use(compression())
    app.use(fileupload());
}