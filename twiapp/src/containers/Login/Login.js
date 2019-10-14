import React,{Component} from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import { userLoginRequest} from "../../store/actions/userActions";
import * as selectors from "../../store/reducers/userReducer";

const FIELDS = [
    {name: 'username', type: 'text', label: 'Username'},
    {name: 'password', type: 'password', label: 'Password'}
];

class Login extends Component{    
    state={
        userCredentials:{},
        errors:{}
    }
    handleValidation(field,value){
        let error={};
        if(value===''){
            error[field]=`The ${field} is required`
        }
        else{
            error[field]='';
        }
        document.getElementById('h4error').innerHTML=error[field]
        return error;
    }

    handleInputChange(e){
        const field=e.target.name;
        const value=e.target.value;
        const error={...this.state.errors,...this.handleValidation(field,value)}        
        this.setState((prevState) => {
            return {
                ...prevState,
                userCredentials: {
                    ...prevState.userCredentials,
                    [field]: value
                },
                errors: {...error}
            };
        });
    
    }
    handleLogin(e){        
        e.preventDefault();
        let errors = {...this.state.errors};
        const userCredentialsValid=Object.keys(errors).filter(field=>errors[field]!=='').length===0 ?true:false;  
        if(!userCredentialsValid){
            return;
        }else{            
            this.props.userLoginRequest(this.state.userCredentials)
                .then(res=>{
                    if (res==='Invalid Username or Password') {                        
                        this.setState(prevState => {
                            return {
                                ...prevState,
                                userCredentials: {...prevState.userCredentials},
                                errors: {...prevState.errors, ...res.errors}
                            };
                        });
                    } else {
                        this.props.history.push('/');
                    }
                })                                
        }

    }
    componentWillUnmount(){        
    }
    render(){        
        if(this.props.isAuthenticated){
            return <Redirect to='/' />;
        }
        let inputFields=FIELDS.map(field=>
            <InputField key={field.name}
            type={field.type} name={field.name} label={field.label}
            errors={this.state.errors}
            onChange={this.handleInputChange.bind(this)}/>
            )
        return(
            <div className='container'>
                <br/>
                <h3 className='text-center'>Login</h3>
                <h4 className='text-center' id='h4error'> </h4>
                <div className="col-sm-8">
                    { this.state.errors.invalidCredentials && <p className="text-danger">{this.state.errors.invalidCredentials}</p> }
                    <form onSubmit={this.handleLogin.bind(this)}>
                        { inputFields }
                        <button className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>            
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        isAuthenticated:selectors.isAuthenticated(state)
    }
}
const mapStateToDispatch=(dispatch)=>{
    return{
        userLoginRequest:(userLoginDetails)=>dispatch(userLoginRequest(userLoginDetails)),        
    }
}

export default connect(mapStateToProps,mapStateToDispatch)(Login);


