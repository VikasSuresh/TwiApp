const Joi=require('@hapi/joi');

let Movieschema=Joi.object({
    Name:Joi.string()        
        .min(1)
        .max(25)
        .required(),
    YOR:Joi.required(),
    Poster:Joi.string(),
    Plot:Joi.string()
        .required(),
    Actors:Joi.required(),
    Producers:Joi.required(),
})
    
let schema=Joi.object({
    Name:Joi.string()        
        .min(1)
        .max(25)
        .required(),
    DOB:Joi.required(),
    Gender:Joi.string().pattern(/M|F/i).required(),
    Bio:Joi.string()        
})


exports.MovieValidate=(obj)=>Movieschema.validate(obj);
exports.Validate=(obj)=>schema.validate(obj);