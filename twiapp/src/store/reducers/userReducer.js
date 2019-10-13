import * as actionTypes from "../actions/ActionTypes";
import jwt from "jsonwebtoken";

const validCredentials=()=>{
    const authToken =localStorage.getItem('jwtToken');
    if(authToken===null){
        return false;
    }else{
        try{
            jwt.decode(authToken);
            return true;
        }
        catch{
            return false;
        }
    }
}

const initialstate={
    isAuthenticated: validCredentials(),
    authenticatedUsername:validCredentials()===false?'':jwt.decode(localStorage.getItem('jwtToken')).username
}

const reducer=(state=initialstate,action)=>{
    switch (action.type){
        case actionTypes.LOGIN_SUCCESSFUL:
            return{
                isAuthenticated:true,
                authenticatedUsername:action.authenticatedUsername
            }
        case actionTypes.LOGOUT_USER:
            return{
                isAuthenticated:false,
                authenticatedUsername:''
            }
        default:
            return state
    }
}

export default reducer;

export const isAuthenticated=(state)=>state.userReducer.isAuthenticated;