import React from "react";
import './InputField.css'


const InputField=(props)=>{        
    return(
        <div className='form-group'>
            <label>{props.label}</label>
            <input type={props.type} name={props.name}
                defaultValue={props.defaultValue} placeholder={props.placeholder ||props.label}                
                className='form-control'
                onChange={props.onChange} {...props}
            />            
        </div>
    )
}
export default InputField;