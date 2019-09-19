import React from "react";
import { NavLink } from "react-router-dom";
import './DisplayMovie.css';
const show=(props)=>{
    return(       
            <ul id="individualMovie">                
                <img src={props.movie.Poster} alt={props.movie.Name} height="250" width="250" />
                <NavLink to={'/'+props.movie._id}><h1>{props.movie.Name}</h1></NavLink>
            </ul>        
    );
}

export default show;