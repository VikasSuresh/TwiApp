import React,{Component} from "react";
import { Connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { userLoginRequest } from "../store/actions/userActions";
import * as selectors from "../store/reducers/userReducer";

class Login extends Component{
    render(){
        return(<div>Hi</div>)
    }
}

// const mapStateToProps=(state)=>{
//     return{
//         isAuthenticated:selectors.isAuthenticated(state)
//     }
// }
// const mapStateToDispatch=(action)=>{
//     return{
        
//     }
// }

// export default Connect(mapStateToProps,mapStateToDispatch)(Login);



export default Login