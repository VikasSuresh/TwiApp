import * as actionTypes from './ActionTypes'
import  axios from "axios";
export const getActors=()=>{
    return dispatch=>{
        axios.get('http://localhost:1000/actors')
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
        axios.get('http://localhost:1000/producers')
            .then(({data})=>{
                dispatch({
                    type:actionTypes.GET_ALL_PRODUCERS,
                    producers:data                    
                })
            })
    }
}

// export const addActor=(actor)=>{
//     console.log(actor,'a')
//     return dispatch=>{
//         axios.post('http://localhost:1000/actors/addActor',actor)
//         .catch(data=>console.log(data))
//     }
// }