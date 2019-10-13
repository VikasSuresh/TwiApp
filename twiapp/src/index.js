import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore,applyMiddleware,combineReducers } from "redux"; 
import MovieReducer from './store/reducers/MovieReducer'; 
import userReducer from "./store/reducers/userReducer";
import logger  from "redux-logger";

const TwiReducer=combineReducers({
MovieReducer,
userReducer
});
const middleware=[thunk]
if(process.env.NODE_env !=='production'){
    middleware.push(logger);
}
const store=createStore(TwiReducer,applyMiddleware(...middleware));

ReactDOM.render(
    <Provider  store={store} >
        <Router>
            <App />
        </Router>
    </Provider>,    
    document.getElementById('root')
)
