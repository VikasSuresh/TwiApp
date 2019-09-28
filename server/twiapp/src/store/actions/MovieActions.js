import * as actionTypes from './ActionTypes';
import axios from "axios";

export const getAllMovies=()=>{
    return dispatch =>{        
        axios.get('/api/movies/')                    
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
        axios.get('/api/movies/'+movieId)         
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
        axios.post('/api/movies/addMovie',movie)
        .catch(err=>console.log(err))                            
    }
}

export const getMoviesBasedOnName=(name)=>{
    console.log(name)
    return dispatch=>{
        axios.get('/api/search/'+name)
        .then(({data})=>{            
            dispatch({
                type:actionTypes.GET_MBON,
                MBON:data
            })
        })
    }
}
