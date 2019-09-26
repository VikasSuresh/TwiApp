function validate(name,value,id) {    
    if(value.length!==0){       
        document.getElementById(id).style.borderBottomColor='green';
    }else{        
        document.getElementById(id).style.borderBottomColor='red';
    }
    
}
exports.Validate=validate;