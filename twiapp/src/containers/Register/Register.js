import React,{Component} from "react";
import { connect } from "react-redux";
import {NavLink, Redirect } from "react-router-dom";
import *as selectors from "../../store/reducers/userReducer";
import { checkUserUniqueness,signupRequest } from "../../store/actions/userActions";
import InputField from "../../components/InputField/InputField";
import "./Register.css";

const FIELDS = [
    {name: 'name', type: 'text', label: 'Name'},
    {name: 'username', type: 'text', label: 'Username'},
    {name: 'email', type: 'email', label: 'E-mail Address'},
    {name: 'password', type: 'password', label: 'Password'},
    {name: 'confirmPassword', type: 'password', label: 'Confirm Password'}
];
const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;    
    return re.test(email);
}

class Register extends Component{
    state={
        userDetails:{},
        error:{}
    }
    commonValidation = (field, value) => {
        let error = {};
        if (value === '') {
            error[field] = `The ${field} is required`;
        } else {
            if (field === 'email' && !validateEmail(value)) {
                error[field] = 'Not a valid Email';
            } else if (field === 'password' && value.length < 4) {
                error[field] = 'Password too short';                
            } else if (field === 'confirmPassword' && value !== this.state.userDetails.password) {
                error[field] = 'Passwords do not match';
            } else {
                error[field] = '';
            }
        }
        document.getElementById('h4error').innerHTML=error[field];
        return error;
    }
    unique=async({field,value})=>{
        const uniquenessError = await this.props.checkUniqueness({ field, value })            
            .then(res=>{                
                let result={};
                if(res.data.error){
                    result=res.data.error;
                }else{
                    result[field]='';
                }
                return result;
            })            
        return uniquenessError;
    }
    handleInputChange=async(e)=>{
        let field=e.target.name;
        let value=e.target.value;
        let errors={...this.state.error}

        const commonValidationError =await this.commonValidation(field,value)        
        let uniquenessError={};
        if((field==='username'|| field==='email')&&value!==''){
            uniquenessError=await this.unique({field,value});
            errors = { ...errors, [field]:  uniquenessError[field] };
        }
        errors={...errors,...commonValidationError}                
        this.setState((prevState)=>{
            return{
                ...prevState,
                userDetails:{
                    ...prevState.userDetails,
                    [field]:value
                },
                errors:{...errors}
            };
        })
    }
    handleSignup=(e)=>{
        e.preventDefault();
        let errors={...this.state.errors};
        const userDetailsValid = Object.keys(errors).filter(field => errors[field] !== "").length === 0 ? true : false;
        if(!userDetailsValid){
            return;
        }
        else{            
            this.props.signupRequest(this.state.userDetails)
            this.props.history.push('/login');                
        }
    }
    render(){
        if(this.props.isAuthenticated){
            return <Redirect to='/' />
        }
        const inputFields=FIELDS.map(field=>            
            <InputField key={field.name}
            type={field.type} name={field.name} label={field.label}
            defaultValue={this.state.userDetails[field.name]}
            errors={this.state.errors}
            onChange={this.handleInputChange}/>            
        )
        return(
            <div className='container'>
                <br/>
                <h3 className="text-center">Join To ADD EDIT DELETE Movies</h3>
                <h4 className="text-center" id='h4error'> </h4>
                <div className="col-sm-8">                    
                    <form onSubmit={this.handleSignup}>
                        { inputFields }
                        <button className="btn btn-primary">Sign Up</button>                           
                        <NavLink to='/Login'  className="btn btn-primary navBt">Login</NavLink>
                    </form>
                    
                </div>
            </div>
        )        
    }
}



const mapStateToProps=state=>{
    return{
        isAuthenticated:selectors.isAuthenticated(state)
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        checkUniqueness:(userInputDetails)=>dispatch(checkUserUniqueness(userInputDetails)),
        signupRequest:(userSignupDetails)=>dispatch(signupRequest(userSignupDetails))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Register);