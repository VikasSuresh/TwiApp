import * as actionTypes from './ActionTypes';
import axios from "axios";

export const getAllMovies=()=>{
    return dispatch =>{
        axios.get('http://localhost:1000/movies')    
        .then(({data})=>{                                    
            dispatch(
                {
                    type:actionTypes.GET_ALL_MOVIES,
                    allMovies:data,                    
                })
        })
    }
}

export const getAMovie=(movieId)=>{
    return dispatch =>{
        axios.get('http://localhost:1000/movies/'+movieId)         
        .then(({data})=>{                
                dispatch({
                    type:actionTypes.GET_MOVIES_ID,
                    movie:data,                    
                })
            })
        .catch(({err})=>{console.log(err)})
    }
}

export const addMovie=(movie)=>{                
    return dispatch=>{
        axios.post('http://localhost:1000/movies/addMovie',movie)
        .catch(err=>console.log(err))                            
    }
}

