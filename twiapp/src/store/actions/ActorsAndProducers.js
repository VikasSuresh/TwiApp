import * as actionTypes from './ActionTypes'
import  axios from "axios";
const API=process.env.REACT_APP_API
export const getActors=()=>{
    return dispatch=>{
        axios.get(`${API}/api/actors`)
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
        axios.get(`${API}/api/producers`)
            .then(({data})=>{
                dispatch({
                    type:actionTypes.GET_ALL_PRODUCERS,
                    producers:data                    
                })
            })
    }
}

