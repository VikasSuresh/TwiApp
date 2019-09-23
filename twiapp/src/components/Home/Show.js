import React from "react";
import { NavLink } from "react-router-dom";
import './Show.css';
const show=(props)=>{
    return(       
            <div className='col-sm-4' id="individualMovie">                
                <img src={props.movie.Poster} alt={props.movie.Name} height="250" width="250" />
                <NavLink id='navlink' to={'/'+props.movie._id}><h2>{props.movie.Name}</h2></NavLink>
            </div>        
    );
}

export default show;