const express = require('express');
const {MovieValidate,Validate}=require('../validate')
const {movies,actors,producers}=require('../model/TwiModel');

const router=express.Router(
    {mergeParams:true}
);


router.get('/movies',async(req,res)=>{
    let result =await movies.find();
    res.send(result);
})

router.get('/actors',async(req,res)=>{
    let result =await actors.find();
    res.send(result);
})

router.get('/producers',async(req,res)=>{
    let result =await producers.find();
    res.send(result);
})

router.get('/movies/:_id',(req,res)=>{
    movies.findById(req.params._id)
    .then(result=>res.send(result))
    .catch(({err})=>{res.send(err)})
    
})

router.get('/actors/:_id',async(req,res)=>{
    let result =await actors.find({_id:req.params._id})
    res.send(result);
})

router.get('/producers/:_id',async(req,res)=>{
    let result =await producers.find({_id:req.params._id})
    res.send(result);
})

router.post('/movies/addMovie',async(req,res)=>{                                    
    let {error}=MovieValidate(req.body);
    console.log(error)    
    if(!error){
        let {Poster}=req.files;    
        Poster.mv(`public/img/${Poster.name}`,(err)=>{
        console.log(err);             
        });
        let result =new movies({
            Name:req.body.Name,
            YOR:req.body.YOR,
            Plot:req.body.Plot,
            Poster:'img/'+Poster.name,
            Producers:req.body.Producers,
            Actors:req.body.Actors.split(',')
        })    
        result.save().then((data)=>res.send(data))
            .catch(data=>console.log(data))
    }
});

router.post('/actors/addActor',(req,res)=>{      
    let {error}=Validate(req.body);    
    if(!error){
        let result =new actors({
            Name:req.body.Name,
            DOB:req.body.DOB,
            Gender:req.body.Gender,
            Bio:req.body.Bio        
        })        
        result.save().then((data)=>res.send(data))
            .catch(data=>console.log(data))
    }
});

router.post('/producers/addProducer',(req,res)=>{          
    let {error}=Validate(req.body);    
    if(!error){
        let result =new producers({
            Name:req.body.Name,
            DOB:req.body.DOB,
            Gender:req.body.Gender,
            Bio:req.body.Bio        
        })        
        
        result.save().then((data)=>res.send(data))
            .catch(data=>console.log(data))    
    }
    
});


router.put('/update',(req,res)=>{              
    let  Poster=''    
    if(req.files!==null){
        Poster=req.files.Poster
        Poster.mv(`public/img/${Poster.name}`,(err)=>{
            console.log(err);             
        });    
        result=movies.findById(req.body._id)
        .then(data=>{
            data.Name=req.body.Name,
            data.YOR=req.body.YOR,
            data.Plot=req.body.Plot,
            data.Poster='img/'+Poster.name,
            data.Producers=req.body.Producers,
            data.Actors=req.body.Actors.split(',')
            data.save().catch(err=>res.send(err))
        });
    }else{
        result=movies.findByIdAndUpdate(req.body._id)
        .then(data=>{
        data.Name=req.body.Name,
        data.YOR=req.body.YOR,
        data.Plot=req.body.Plot,        
        data.Producers=req.body.Producers,
        data.Actors=req.body.Actors.split(',')
        data.save().catch(err=>res.send(err))
    })  
    }                             
});

router.delete('/delete',(req,res)=>{    
    movies.remove({_id:req.body._id}).then(res.send('success')).catch(err=>res.send(err))
})

router.get('/search/:name',(req,res)=>{
    let regex= new RegExp('^'+req.params.name)    
    movies.find({Name:regex})
    .then(data=>{
        res.send(data)
    })
})
exports.twiRoute=router;
