const jwt=require('jsonwebtoken');
const config=require('config');

module.exports=isAuthenticated=(req,res,next)=>{
    const authHeader=req.headers['authorization'];    
    const authToken=authHeader//.split(' ')[1]
    if(authToken){
        jwt.verify(authToken,config.get('jwtsecret'),(err,decoded)=>{
            if(err){
                res.status(401).json({ error: 'Failed to authenticate' });
            }else{
                req.doReturn = decoded.id;
                next();
            }
            
        })    
    }else{
        res.status(403).json({ error: 'No token provided' })
    }
}