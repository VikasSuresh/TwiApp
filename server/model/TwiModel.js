const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    Name:String,
    YOR:Date,
    Plot:String,
    Poster:String,
    Producers:String,
    Actors:[String]
});

const movies= mongoose.model('Movie',movieSchema);

const actorSchema = new mongoose.Schema({
    Name:String,
    DOB:Date,
    Gender:String,
    Bio:String,    
});

const actors=mongoose.model('Actor',actorSchema);

const producerSchema = new mongoose.Schema({
    Name:String,
    DOB:Date,
    Gender:String,
    Bio:String,    
});

const producers=mongoose.model('Producer',producerSchema);

exports.movies=movies;
exports.actors=actors;
exports.producers=producers;