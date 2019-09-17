const express = require('express');
const router=express.Router(
    {mergeParams:true}
);
const mongoose =require('mongoose');
const {movies,actors,producers}=require('../model/TwiModel');
mongoose.connect('mongodb://localhost:27017/TwiApp',{useNewUrlParser:true})
    .then(()=>console.log('Connected to the db'))
    .catch((err)=>console.log(err));

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

router.post('/movies/addMovie',(req,res)=>{                    

    let {Poster}=req.files;
    Poster.mv(`public/img/${Poster.name}`,({err})=>{
        console.log(err);
    })
    let result =new movies({
        Name:req.body.Name,
        YOR:req.body.YOR,
        Plot:req.body.Plot,
        Poster:'img/'+Poster.name,
        Producers:req.body.Producers,
        Actors:req.body.Actors
    })
    result.save().then((data)=>res.send(data))
        .catch(data=>console.log(data))
});

router.post('/actors/addActor',(req,res)=>{      
    let result =new actors({
        Name:req.body.Name,
        DOB:req.body.DOB,
        Gender:req.body.Plot,
        Bio:req.body.Producers        
    })
    result.save().then((data)=>res.send(data))
        .catch(data=>console.log(data))
});

router.post('/producers/addProducer',(req,res)=>{          
    let result =new producers({
        Name:req.body.Name,
        DOB:req.body.DOB,
        Gender:req.body.Plot,
        Bio:req.body.Producers        
    })
    result.save().then((data)=>res.send(data))
        .catch(data=>console.log(data))
});

exports.twiRoute=router;