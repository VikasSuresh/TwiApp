import * as actionTypes from '../actions/ActionTypes'
import jwt from 'jsonwebtoken';
import Axios from "axios";
const API=process.env.REACT_APP_API;


export const checkUserUniqueness=({field,value})=>{
    return dispatch=>{
        return Axios.post(`${API}/user/validate`,{field,value})            
    }
}

export const signupRequest=(userSignupDetails)=>{
    return dispatch=>{
        Axios.post(`${API}/user/signup`,userSignupDetails)
            .catch(err=>console.log(err))
    }
}

export const userLoginRequest=(userLoginDetails)=>{
    return dispatch=>{
        return Axios.post(`${API}/user/login`,userLoginDetails)
            .then(({data})=>{
                if(!data.errors){
                    const token= data.token;
                    delete data.token;
                    localStorage.setItem('jwtToken',token);
                    dispatch({
                        type:actionTypes.LOGIN_SUCCESSFUL,
                        authorizationToken: token,
                        authenticatedUsername:jwt.decode(token).username
                    })                  
                }else{
                    return data.errors.invalidCredentials;
                }
            })
    }
}

export const userLogoutRequest=()=>{
    return dispatch=>{        
        localStorage.removeItem('jwtToken');        
        dispatch({ type: actionTypes.LOGOUT_USER });
    }
}