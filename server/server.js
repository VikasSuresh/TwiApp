const express =require('express');
const app =express();
const path=require('path');
const aws=require('aws-sdk');

app.use('/img',express.static(path.join(__dirname,'public/img')));   

require('./startup/db')();
require('./startup/prod')(app);
require('./startup/route')(app);

aws.config.region='ap-south-1';
app.get('/sign-s3', (req, res) => {
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
      Bucket: process.env.S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };
  
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if(err){
        console.log(err);
        return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };
      res.write(JSON.stringify(returnData));
      res.end();
    });
  });

if(process.env.NODE_ENV==='production'){
    app.use(express.static('twiapp/build'));
    
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'twiapp','build','index.html'));
    })
}

const port = process.env.PORT || 1000;

app.listen(port,()=>{    
    console.log('Listening on '+port);    
})