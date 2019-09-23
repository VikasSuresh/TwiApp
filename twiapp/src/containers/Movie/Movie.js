import React,{ Component } from "react";
import { connect } from "react-redux";
import { withRouter} from "react-router-dom";
import  * as selectors from "../../store/reducers/MovieReducer";
import { getAMovie } from "../../store/actions/MovieActions";
import { getActors,getProducers } from "../../store/actions/ActorsAndProducers";
import $ from'jquery';
import './Movie.css'
import Axios from "axios";
import MovieRender from "../../components/Movie/Movie";
import ModalMovie from "../../components/Movie/MovieModal";

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
            },500)            
        }                    
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
        else if ( this.state.actors.length!==0 && this.state.producers.length!==0 ) {                     
            // this.state.actors=this.props.actors.filter((a)=>this.props.movie.Actors.includes(a._id))
            // this.state.producers=this.props.producers.filter((a)=>a._id===this.props.movie.Producers)            
            return(<div>                   
                <MovieRender state={this.state} del={this.Del} />   
                <ModalMovie props={this.props} state={this.state} save={this.Save} />     
                </div>       
            )}
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