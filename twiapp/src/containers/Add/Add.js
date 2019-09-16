import React ,{Component} from 'react';
import AddMovie from './addMovie';
import AddActors from './AddActors';
import AddProducer from './AddProducer';
class Add extends Component{
    render(){
        return(
            <div>            
            <AddActors/>
            <AddProducer/>            
            <AddMovie/>
            </div>
        )
    }
}

export default Add;