import React,{ Component } from "react";
import {connect} from "react-redux";
import { getActors,getProducers } from "../../store/actions/ActorsAndProducers";
import { addMovie } from "../../store/actions/MovieActions";
import * as selectors from '../../store/reducers/MovieReducer';
// import AddMovieRender from "../../components/AddMovie";
import '../../components/AddMovie.css';
import {fileUpload} from '../../fileUpload';


class AddMovie extends Component{
    state={
        isFetched:false,
        data:new FormData(),
        temp:[],                
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
        this.state.data.append('YOR',this.Date.value);
        this.state.data.append('Plot',this.Plot.value);
        this.state.data.append('Poster',this.Poster.value);
        this.state.data.append('Producers',this.Producers.value);
        this.state.data.append('Actors',[...new Set(this.state.temp)]);                
        this.props.addMovie(this.state.data)
    }
    
    handleChange(e){                                                     
    if(this.Name.value.length!==0 && this.Poster.value.length!==0 && this.Date.value.length!==0 && this.state.temp!==[] &&this.Producers.value!=='Default'){                
            document.getElementById('submit').disabled=false;        
    }else{        
        document.getElementById('submit').disabled=true;        
    }
    
    }
    handleActorChange(e){                                              
        this.state.temp.push(e.target.value)         
    }
    fileChange(e){
        if(e.target.files[0]!==null){
            fileUpload(e.target.files[0])
        }
    }
    render(){        
        if(this.state.isFetched===true){            
        return(            
            <div className='container'>
            <div className='row'>
                <div className='col-sm-4'>
                    <div id="demo" className="carousel slide" data-ride="carousel">
                        <ul className="carousel-indicators">
                        <li data-target="#demo" data-slide-to="0" className="active"></li>
                        <li data-target="#demo" data-slide-to="1"></li>
                        <li data-target="#demo" data-slide-to="2"></li>
                        </ul>
                        
                        <div className='carousel-inner'>
                            <div className='carousel-item active'>
                                <img src='/img/Carousel-1.jpeg' alt='img'  height='25%' />
                            </div>
                            <div className='carousel-item'>
                                <img src='/img/Carousel-2.jpg' alt='img'  height='25%' />
                            </div>
                            <div className='carousel-item'>
                                <img src='/img/Carousel-3.jpg' alt='img' height='25%' />
                            </div>
                        </div>
    
                        <a className='carousel-control-prev' href="#demo" data-slide="prev">
                            <span className="carousel-control-prev-icon"></span>
                        </a>
    
                        <a className='carousel-control-next' href="#demo" data-slide="next">
                            <span className="carousel-control-next-icon"></span>
                        </a>
                    </div>
                </div>
                <div className='col-sm-6 MovieForm'>                                                       
                <span id='req'>Fill all the fields </span>
                <div>
                    <input onChange={this.fileChange.bind(this)} type='file' name='Poster' className='form-control' />                      
                </div> 
                <form action='/' onSubmit={this.submit.bind(this)}>                                                               
                    <div>
                        <input onChange={this.handleChange.bind(this)} type='text' name='Name' id='nameInput' className='form-control' placeholder="Name" ref={ref=>this.Name=ref}/>                        
                    </div>
                    <div>
                        <input onChange={this.handleChange.bind(this)} type='date' name='YOR' id='dateInput' className='form-control' placeholder="Date" ref={ref=>this.Date=ref}/>                    
                    </div>
                    <div>
                        <textarea name='Plot' id='plotTextArea' className='form-control' placeholder='Plot' ref={ref=>this.Plot=ref} />                    
                    </div>      
                    <input type='hidden' id='Poster-url' value='' ref={ref=>this.Poster=ref} />
                    <label>Actors</label>
                    <select multiple={true} id='ActorsInput' onChange={this.handleActorChange.bind(this)} name='Actors' className="browser-default custom-select mb-4">
                        <option disabled>Choose Actors</option>                   
                        {this.props.actors.map((a,i)=>(
                            <option key={i} value={a._id}>{a.Name}</option>
                        ))}
                    </select>
                    <label>Producers</label>
                    <select id='ProducersInput' onChange={this.handleChange.bind(this)} className="browser-default custom-select mb-4" name='Producers' ref={ref=>this.Producers=ref} defaultValue={'Default'} >
                        <option value='Default' disabled={true}>Choose Producers</option>
                        {this.props.producers.map((p,i)=>(
                            <option key={i} value={p._id}>{p.Name}</option>
                        ))}
                    </select>
                    <div>
                        <button disabled={true} id='submit' className="btn btn-info btn-lg" type="submit">Send</button>
                    </div>
                </form>
                </div>
    
            </div>          
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