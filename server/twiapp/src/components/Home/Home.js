import React from "react";
import './Home.css'
import {NavLink} from 'react-router-dom'
const Bootstrap=(props)=>(
    <div>
        <div className="jumbotron text-center header">
            <NavLink to='/'><img src='/img/Twi.jpg'alt='Twiiii' height='50' widht='50'/></NavLink>
            <h4>An Website for Moviesssss</h4> 
        </div>

        <nav className="navbar bg-dark navbar-dark">
        <form className="form-inline" action='/search' >
            <input className="form-control" type="search" name='Movie' placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success "  type="submit">Search</button>
        </form>        
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="/addMovie">Add Movie</a>
                </li>
            </ul>
        </div>  
        </nav>

        <div className='container'>
            <div className='row'>                
                {props.allMovies}
            </div>
        </div>
                
    </div>
)

export default Bootstrap;