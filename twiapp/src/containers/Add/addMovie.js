import React,{ Component } from "react";
import {connect} from "react-redux";
import { getActors,getProducers } from "../../store/actions/ActorsAndProducers";
import { addMovie } from "../../store/actions/MovieActions";
import * as selectors from '../../store/reducers/MovieReducer'


class AddMovie extends Component{
    state={
        isFetched:false,
        data:new FormData(),
        temp:[]
    }
    componentDidMount(){
        this.props.getActors();
        this.props.getProducers();
    }
    componentDidUpdate(prevProps){
        if(this.props!==prevProps){
            this.setState({
                isFetched:true
            })
        }
    }    
    submit(e){               
        this.state.data.append('Name',this.Name.value);
        this.state.data.append('YOR',this.YOR.value);
        this.state.data.append('Plot',this.Plot.value);
        this.state.data.append('Poster',this.Poster.files[0]);
        this.state.data.append('Producers',this.Producers.value);
        this.state.data.append('Actors',this.state.temp);
        this.props.addMovie(this.state.data)
    }
    handleChange(e){
        let value=e.target.value
        this.state.temp.push(value)        
    }
    render(){        
        if(this.state.isFetched===true){
        return(
        <div>
        <form action='/'  onSubmit={this.submit.bind(this)}>
        <div>
        <label>Name :-</label>              
        <input type='text' name='Name'ref={ref=>this.Name=ref} />    
        </div>
        <div>
        <label>YOR :-</label>        
        <input type='date' name='YOR'ref={ref=>this.YOR=ref} /> 
        </div>       
        <div>
        <label>Plot :-</label>        
        <input type='text' name='Plot' ref={ref=>this.Plot=ref} />    
        </div>
        <div>
        <label>Upload Image</label>
        <input type='file' ref={(ref)=>{this.Poster=ref}} name='Poster' ></input>
        </div>
        <div>
        <label>Producer:-</label>                        
        <select name='Producers' ref={ref=>this.Producers=ref} >            
        <option value='' >-</option>  
        {this.props.producers.map((prod,i)=>(
            <option key={i} value={prod._id}>{prod.Name}</option>            
        ))}        
        </select>        
        </div>
        <div>
        <label>Actors:-</label>                
        <select multiple name='Actors' onChange={this.handleChange.bind(this)} >          
        {this.props.actors.map((actor,i)=>(
            <option key={i} value={actor._id}>{actor.Name}</option>            
        ))} 
        </select>  
        </div>
        <div>
        <button type='submit'>submit</button>
        </div>
        </form>    
        </div>
        )}
        else{
            return(<div>Loading</div>)
            
        }
    }
}

const mapStateToProps=(state)=>{
return{
    actors:selectors.getActors(state),
    producers:selectors.getProducers(state),
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{    
        getActors:()=>dispatch(getActors()),
        getProducers:()=>dispatch(getProducers()),
        addMovie:(movie)=>dispatch(addMovie(movie))
    }
    }

export default connect(mapStateToProps,mapDispatchToProps)(AddMovie);


/*

import React,{ Component } from "react";
import {connect} from "react-redux";
import { getActors,getProducers } from "../../store/actions/ActorsAndProducers";
import { addMovie } from "../../store/actions/MovieActions";
import * as selectors from '../../store/reducers/MovieReducer'


class AddMovie extends Component{
    state={
        isFetched:false,
        movie:{}                 
    }
    componentDidMount(){
        this.props.getActors();
        this.props.getProducers();
    }
    componentDidUpdate(prevProps){
        if(this.props!==prevProps){
            this.setState({
                isFetched:true
            })
        }
    }
    handleInputChange(e){
        let field=e.target.name;
        let value=e.target.value;
        
        // if(this.Poster.files.length>0 && field==='Poster'){                        
        //     let data = new FormData();
        //     data.append('file',this.Poster.files[0])                        
        //     value=data;            
        // }    
        this.setState((prevState)=>{
            return{
                ...prevState,
                movie:{
                    ...prevState.movie,
                    [field]:value
                }
            }
        });        
    }
    submit(e){       
        e.preventDefault();                             
        this.props.addMovie(this.state.movie)
    }
    render(){        
        if(this.state.isFetched===true){
        return(
        <div>
        <form action='/'  onSubmit={this.submit.bind(this)}>
        <div>
        <label>Name :-</label>              
        <input type='text' name='Name'onChange={this.handleInputChange.bind(this)} />    
        </div>
        <div>
        <label>YOR :-</label>        
        <input type='date' name='YOR'onChange={this.handleInputChange.bind(this)} /> 
        </div>       
        <div>
        <label>Plot :-</label>        
        <input type='text' name='Plot' onChange={this.handleInputChange.bind(this)} />    
        </div>
        <div>
        <label>Upload Image</label>
        <input type='file' ref={(ref)=>{this.Poster=ref}} name='Poster'onChange={this.handleInputChange.bind(this)}></input>
        </div>
        <div>
        <label>Producer:-</label>                        
        <select name='Producers' onChange={this.handleInputChange.bind(this)} >            
        <option value='' >-</option>  
        {this.props.producers.map((prod,i)=>(
            <option key={i} value={prod._id}>{prod.Name}</option>            
        ))}        
        </select>        
        </div>
        <div>
        <label>Actors:-</label>                
        <select multiple name='Actors'onChange={this.handleInputChange.bind(this)} >          
        {this.props.actors.map((actor,i)=>(
            <option key={i} value={actor._id}>{actor.Name}</option>            
        ))} 
        </select>  
        </div>
        <div>
        <button type='submit'>submit</button>
        </div>
        </form>    
        </div>
        )}
        else{
            return(<div>Loading</div>)
            
        }
    }
}

const mapStateToProps=(state)=>{
return{
    actors:selectors.getActors(state),
    producers:selectors.getProducers(state),
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{    
        getActors:()=>dispatch(getActors()),
        getProducers:()=>dispatch(getProducers()),
        addMovie:(movie)=>dispatch(addMovie(movie))
    }
    }

export default connect(mapStateToProps,mapDispatchToProps)(AddMovie);


*/