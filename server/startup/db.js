const mongoose =require('mongoose');
const config =require('config');
module.exports=function(){
    const db=config.get('db');    
    mongoose.connect(db,{useNewUrlParser:true})
    .then(()=>console.log('Connected to the db'))
    .catch((err)=>console.log(err));
}
// mongodb+srv://TwiUser:VvfHtw8UmxuQyGv@twiapp-omz2n.mongodb.net/test?retryWrites=true&w=majority
