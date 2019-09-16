import React,{ Component } from "react";
import axios from 'axios';

class Producers extends Component{
    state={
        producer:{}
    }
    handleInuptChange(e){
        const field=e.target.name;
        const value=e.target.value;        
        this.setState(prevState=>{
            return{
                ...prevState,
                producer:{
                    ...prevState.producer,
                    [field]:value
                }
            }
        })
    }
    submit(e){
        e.preventDefault();        
        axios.post('http://localhost:1000/producers/addProducer',this.state.producer)
        .then(()=>{
            document.location.reload();
        })
    }
    render(){
        return(<div>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#ProducerModal">
                Add Producer
            </button>

        <div className="modal fade" id="ProducerModal" tabIndex="-1" role="dialog" aria-labelledby="ProducerModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <form onSubmit={this.submit.bind(this)} action='/'>
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="Producer" id="exampleModalLabel">Producer</h5>
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


export default Producers;