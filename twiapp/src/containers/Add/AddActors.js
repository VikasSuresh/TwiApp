import React,{ Component } from "react";
// import {addActor} from '../../store/actions/ActorsAndProducers'
import axios from 'axios';

class Actors extends Component{
    state={
        actor:{}
    }
    handleInuptChange(e){
        const field=e.target.name;
        const value=e.target.value;        
        this.setState(prevState=>{
            return{
                ...prevState,
                actor:{
                    ...prevState.actor,
                    [field]:value
                }
            }
        })
    }
    submit(e){
        e.preventDefault();
        axios.post('http://localhost:1000/actors/addActor',this.state.actor)
        .then(()=>{
            document.location.reload();
        })
    }
    render(){
        return(<div>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#ActorModal">
                Add Actor
            </button>

        <div className="modal fade" id="ActorModal" tabIndex="-1" role="dialog" aria-labelledby="ActorModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <form onSubmit={this.submit.bind(this)} action='/'>
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="Actor" id="exampleModalLabel">Actor</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                
                <div><label>Name:-</label>
                <input type='text' name='Name' onChange={this.handleInuptChange.bind(this)} />
                </div>
                <div>
                <label>DOB:-</label>
                <input type='date' name='DOB'onChange={this.handleInuptChange.bind(this)} />
                </div>
                <div>
                <label>Gender:-</label>
                <input type='text' name='Gender' onChange={this.handleInuptChange.bind(this)} />
                </div>
                <div>
                <label>Bio:-</label>
                <input type='text' name='Bio' onChange={this.handleInuptChange.bind(this)} />
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Save changes</button>
            </div>
            </div>
            </form>
        </div>
        </div>
        </div>)
    }
}


export default Actors;