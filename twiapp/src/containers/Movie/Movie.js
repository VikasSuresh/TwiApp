import React,{ Component } from "react";
import { connect } from "react-redux";
import { withRouter} from "react-router-dom";
import  * as selectors from "../../store/reducers/MovieReducer";
import { getAMovie } from "../../store/actions/MovieActions";
import { getActors,getProducers } from "../../store/actions/ActorsAndProducers";
import $ from'jquery';
import './Movie.css'
import Axios from "axios";

class Movie extends Component{
    state={
        isFetched:false,
        movie:{},
        actors:[],
        producers:{}
    }
    componentDidMount(){        
        this.props.getMovie(this.props.id);
        this.props.getActors();
        this.props.getProducers();
    }
    // componentDidUpdate(prevProps){
    //     if( this.props.actors.length!==0 && !(_.isEmpty(this.props.producers)) ){                       
    //         this.setState({
    //             isFetched:true,
    //             movie:this.props.movie,
    //             actors:this.props.actors.filter((a)=>this.props.movie.Actors.includes(a._id)),
    //             producers:this.props.producers.filter((a)=>a._id===this.props.movie.Producers)
    //         })
    //     }                         
    // }

    
    componentDidUpdate(prevProps){
        if(prevProps!==this.props){                                               
            setTimeout(()=>{
                this.setState({
                    isFetched:true,
                    movie:this.props.movie,
                    actors:this.props.actors.filter((a)=>this.props.movie.Actors.includes(a._id)),
                    producers:this.props.producers.filter((a)=>a._id===this.props.movie.Producers)
                })
            },1000)
            
        }                    
    }
    
    
    Edit(){
        $('.edit').show();
        $('.view').hide();
    }
    Del(){
        $.ajax('http://localhost:1000/delete',
        {
            method:'Delete',
            data:{_id:$('#del').val()},
            complete:function (){
                window.location.replace("/")            
            }                        
        })
    }
    Save(){
        let data=new FormData();
        data.append('_id',$('#save').val())
        data.append('Name',$('#Name').val())
        data.append('YOR',$('#YOR').val())
        data.append('Plot',$('#Plot').val())
        data.append('Actors',$('#actors').val())
        data.append('Producers',$('#producers').val())
        data.append('Poster',$('#img')[0].files[0])
            
        Axios.put('http://localhost:1000/update',data).then(
            document.location.reload()
        )           
        
    }
    Cancel(){
        $('.view').show();
        $('.edit').hide();
    }
    render(){           
        let movie='Loading';           
        if(this.props.movie===""){
            return(                
                <div>
                    <div className='alert alert-danger'>Error in Data</div>
                    <a href='/'>Redirect to Home</a>
                </div>   
            )
        }
        else if (this.state.isFetched && this.state.actors.length!==0 && this.state.producers.length!==0 ) {
            movie=this.state.movie;                 
            let actors=this.state.actors            
            let producers=this.state.producers              
            return(<div>            
            <div className='view'><img src={movie.Poster} alt={movie.Name} height="100" width="100"/></div>
            <div className='view'>{movie.Name}</div>
            <div className='view'>{movie.YOR}</div>
            <div className='view'>{movie.Plot}</div>
            <div>{actors.map(m=>(                
                <div className='view' key={m._id}>{m.Name}</div>                                
            ))}</div>            
            <div className='view'>{producers.map(m=>(
                <div key ={m._id}>{m.Name}</div>
            ))}</div>
            
            <div className='edit'>
                <input type='file' id='img'  />
            </div>
            <div className='edit'>
            <input type='text' defaultValue={movie.Name} name='Name' id='Name' />
            </div>

            <div className='edit'>
            <input type='text' defaultValue={movie.YOR} name='YOR' id='YOR' />
            </div>
            
            <div className='edit'>
            <input type='text' defaultValue={movie.Plot} name='Plot' id='Plot' />
            </div>
            
            <div className='edit'>
                <select id='actors' multiple={true} defaultValue={actors.map(m=>m._id)} >
                {this.props.actors.map(m=>(
                    <option key={m._id} value={m._id}  >{m.Name}</option>                    
                ))}
                </select>
            </div>
            <div className='edit'>
            <select id='producers' defaultValue={producers.map(m=>m._id)[0]}>
            {this.props.producers.map(m=>(                
                <option key ={m._id} value={m._id} >{m.Name}</option>                
            ))}
            </select>
            </div>
            <div className='edit'>
                <button id='save' value={this.state.movie._id} onClick={this.Save}>Save</button> 
                <button onClick={this.Cancel}>Cancel</button>
            </div>
            <div>
            <button  onClick={this.Edit}>Edit</button> 
            <button id='del' value={this.state.movie._id} onClick={this.Del}>Delete</button>
            </div>            
            </div>
                )        
        }
        else{
            return(
            <div>
                <div>{movie}</div>
                <a href='/'>Redirect to Home</a>
            </div>                                
            )
        }
         
    }
}

const mapStateToProps=(state,{match:{params}})=>{    
    return{
        movie:selectors.getMovie(state),
        id:params.id,
        actors:selectors.getActors(state),
        producers:selectors.getProducers(state),
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
    getMovie:(id)=>dispatch(getAMovie(id)),    
    getActors:()=>dispatch(getActors()),
    getProducers:()=>dispatch(getProducers())
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Movie));