import React from 'react';
import {NavLink} from "react-router-dom";
import './Movie.css'
const Movie=(props)=>(
    <div className='container'>
        <div className='row'>
            <div className='col-sm-2'></div>
            <div className='col-sm-8'>
                <img src={props.state.movie.Poster} alt={props.state.movie.Name} id='moviePoster' ></img> 
                <h1>{props.state.movie.Name}</h1>
                <h6>{props.state.movie.YOR.slice(0,10)}</h6>             
                <h4>{props.state.movie.Plot}</h4>  
                <h4>Actors: {props.state.actors.map((a,i)=>(                
                    <span key={i}>{a.Name} </span>                                
                ))}</h4>
                <h4>Producers: {props.state.producers.map((p,i)=>(
                    <span key={i}>{p.Name} </span>  
                ))                
                }</h4>
                <div className='col-sm-12 btnn'>
                <button className='btn btn-info btn-md' id='edit' data-toggle="modal"
                disabled={!props.auth}
                data-target="#MovieModal"
                >Edit</button>
                <button className='btn btn-danger btn-md ' id='del' 
                disabled={!props.auth}
                onClick={props.del} 
                value={props.state.movie._id} >Delete</button>
                </div>                
                <NavLink to='/' className='btn btn-primary home'>Home</NavLink>
            </div>        
        </div>
    </div>
    
)

export default Movie