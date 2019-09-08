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

router.get('/movies/:_id',async(req,res)=>{
    let result =await movies.find({_id:req.params._id})
    res.send(result);
})

router.get('/actors/:_id',async(req,res)=>{
    let result =await actors.find({_id:req.params._id})
    res.send(result);
})

router.get('/producers/:_id',async(req,res)=>{
    let result =await producers.find({_id:req.params._id})
    res.send(result);
})


exports.twiRoute=router;