import React,{ Component } from "react";
import axios from 'axios';
import './AddProducer.css'
const API=process.env.REACT_APP_API
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
        axios.post(`${API}/api/producers/addProducer`,this.state.producer,{
            headers:{
                'authorization':localStorage.getItem('jwtToken')
            }
        })
        .then(()=>{
            document.location.reload();
        })
    }
    render(){
        return(<div className='col-sm-8 Producer'  >
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
                <div>
                <input type='text' name='Name' className='form-control' onChange={this.handleInuptChange.bind(this)} placeholder='Name'/>
                </div>
                <div>                
                <input type='date' name='DOB'className='form-control' onChange={this.handleInuptChange.bind(this)}/>
                </div>
                <div>               
                Enter M OR F for Gender 
                <input type='text' name='Gender' className='form-control' onChange={this.handleInuptChange.bind(this)} placeholder='Gender'/>
                </div>
                <div>                
                <textarea type='text' name='Bio' className='form-control' onChange={this.handleInuptChange.bind(this)} placeholder='Bio' />
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