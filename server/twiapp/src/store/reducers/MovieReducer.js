import * as actionTypes from "../actions/ActionTypes";

const initialstate={ 
 allMovies:[],
 movie:{},
 actors:[],
 producers:[],
 MBON:[]
};

const reducer=(state=initialstate,action)=>{
    switch(action.type){
        case actionTypes.GET_ALL_MOVIES:                                  
            return {
                ...state,
                allMovies:action.allMovies,            
            }            
        case actionTypes.GET_MOVIES_ID:
            return{
                ...state,
                movie:action.movie,                
            }
        case actionTypes.GET_ALL_ACTORS:                                  
        return {
            ...state,
            actors:action.actors,            
        }  
        case actionTypes.GET_ALL_PRODUCERS:                                  
        return {
            ...state,
            producers:action.producers,            
        }   
        case actionTypes.GET_MBON:
            return{
                ...state,
                MBON:action.MBON
            }
        default:
            return state;

    }
}

export default reducer;

export const getMovies=(state)=>state.MovieReducer.allMovies;
export const getMovie=(state)=>state.MovieReducer.movie;
export const getActors=(state)=>state.MovieReducer.actors;
export const getProducers=(state)=>state.MovieReducer.producers;
export const getMBON=(state)=>state.MovieReducer.MBON;