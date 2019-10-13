const express =require('express')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const config=require('config');

const {user}= require('../model/UserModel');

const router=express.Router({mergeParams:true});

router.post('/signup',(req,res)=>{
    const name = req.body.name || '';
    const username = req.body.username || '';
    const email = req.body.email || '';
    const password = req.body.password || '';
    const confirmPassword = req.body.confirmPassword || '';

    let reqbody={name,username,email,password,confirmPassword};
    
    let errors={}

    Object.keys(reqbody).forEach(async field=>{
        if(reqbody[field]===''){
            errors={...errors,[field]:'This field is required'}
        }
        if(field==='username'||field==='email'){
            const value =reqbody[field]
            const {error,isUnique}=await checkUserUniqueness(field, value);
            if(!isUnique){
                errors={...errors,...error}
            }
        }
        if(field==='email'&& !validateEmail(reqbody[field])){
            errors={...errors,[field]:'Not a valid Email'}
        }
        
        if(field==='password'&& password!=='' && password<4){
            errors={...errors,[field]:'Short PWD'}
        }
        if (field === 'confirmPassword' && confirmPassword !== password) {
            errors = {...errors, [field]: 'Passwords do not match'}
        }
    })

    if (Object.keys(errors).length>0){
        res.json({errors});
    }
    else{
        const USER= new user({
            name:name,
            email:email,
            username:username,
            password:password
        })
        
        bcrypt.genSalt(10,(err,salt)=>{
            if(err) return err;

            bcrypt.hash(USER.password,salt,(err,hash)=>{
                if(err)return err;
                USER.password=hash;
                USER.save()
                    .catch(err=>console.log(err))
            })

        })
    }
})
router.post('/login',(req,res)=>{
    let username=req.body.username||'';
    let password=req.body.password||'';
    
    let errors={};
    if (username === '') {
        errors = {...errors, username: 'This field is required' };
    }
    if (password === '') {
        errors = {...errors, password: 'This field is required' };
    }    
    if (Object.keys(errors).length > 0) {
        res.json({ errors });
    } else {
        user.findOne({username:username},(err,obj)=>{            
            if(err)throw err;
            if(Boolean(obj)){                
                bcrypt.compare(password,obj.password,(err,isMatch)=>{                    
                    if (err) return err;
                    if (isMatch) {
                        const token=jwt.sign({
                            id:obj._id,
                            username:obj.username
                        },config.get('jwtsecret'));
                        res.json({token})
                    }else{
                        res.json({ errors: { invalidCredentials: 'Invalid Username or Password' } });
                    }
                })
            }else{
                res.json({ errors: { invalidCredentials: 'Invalid Username or Password' } });
            }
        })
    }
})
router.post('/validate', async (req, res) => {
    const { field, value } = req.body;
    const { error, isUnique } = await checkUserUniqueness(field, value);

    if (isUnique) {
        res.json({ success: 'success' });
    } else {
        res.json({ error });
    }
});


const checkUserUniqueness=(field,value)=>{
    return{error,isUnique}=user.findOne({[field]:value})
        .then(user=>{
            let res={}
            if(Boolean(user)){
                res={error:{[field]:"This " + field + " is not available"},isUnique:false}
            }else{
                res={error:{[field]:''},isUnique:true}
            }
            return res;
        })
        .catch(err=>console.log(err))
}

const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


exports.userRoute=router;