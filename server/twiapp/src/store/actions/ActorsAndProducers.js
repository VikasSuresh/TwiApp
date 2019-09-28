import * as actionTypes from './ActionTypes'
import  axios from "axios";
export const getActors=()=>{
    return dispatch=>{
        axios.get('/api/actors')
            .then(({data})=>{
                dispatch({
                    type:actionTypes.GET_ALL_ACTORS,
                    actors:data                    
                })
            })
    }
}

export const getProducers=()=>{
    return dispatch=>{
        axios.get('/api/producers')
            .then(({data})=>{
                dispatch({
                    type:actionTypes.GET_ALL_PRODUCERS,
                    producers:data                    
                })
            })
    }
}

